document.addEventListener('DOMContentLoaded', () => {
  const getEtym = async (word) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = `http://www.etymonline.com/index.php?term=${word}`;

    const data = await fetch(proxyurl + url)
    const words = await data.text()
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(words, "text/html");
    let html = htmlDoc.getElementById('dictionary');
    return html.innerText;
  }

  let openTimer = () => {
    console.log("open timer set")
    let bottomDiv = document.getElementById('bottomDiv');
    window.openID = setTimeout(() => {
      bottomDiv.className = "visible";
    }, 1000)
  }

  let closeTimer = () => {
    console.log("close timer set")
    let bottomDiv = document.getElementById('bottomDiv');
    window.closeID = setTimeout(() => {
      bottomDiv.className = "invisible";
    }, 1000)
  }

  const populateBottom = (popup) => {
    let bottomDiv = document.getElementById('bottomDiv');
    bottomDiv.innerHTML = '';
    let popDup = popup.cloneNode(true);
    popDup.className = 'popDup';
    bottomDiv.appendChild(popDup);
  }

  const addSpinner = () => {
    let bottomDiv = document.getElementById('bottomDiv');
    bottomDiv.innerHTML = '';
    let spinner = document.createElement('div');
    spinner.className = 'loader';
    bottomDiv.appendChild(spinner);
  }

  const mouseEnterWord = (e) => {
    let el = e.target;
    openTimer();
    if (el.lastChild.classList === undefined) {
      //create spinner
      //add spinner to el
      addSpinner();
      let preText = e.target.innerHTML;
      let text = preText.replace(/^\W+/, "").replace(/\W+$/, "");
      getEtym(text)
        .then(result => {
          popup = document.createElement('div');
          popup.className = "popup"
          popup.innerHTML = result;
          //deletespinner
          el.appendChild(popup);

          populateBottom(popup);
        })
    } else {

      popup = el.lastChild;
      populateBottom(popup);

    };
  }

  const mouseLeaveWord = () => {
    //remove spinner
    if (window.openID) {
      clearTimeout(openID);
    }
    closeTimer();
  }

  const makeSpans = () => {
    let treeWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {acceptNode: (node) => {
        if ( ! /^\s*$/.test(node.data) ) {
          return NodeFilter.FILTER_ACCEPT;
        }
      }}
    );
    let textNodes = [];

    while(treeWalker.nextNode()) {
      textNodes.push(treeWalker.currentNode);
    }

    const makeText = (txt) => document.createTextNode(txt);

    const insertBefore = (newEl, el) => {
      el.parentNode.insertBefore(newEl, el);
    };

    const removeElement = (el) => {
      el.parentNode.removeChild(el);
    };

    const makeSpan = (txt, attrs) => {
      let s = document.createElement('span');
      for (let prop in attrs) {
        if (attrs.hasOwnProperty(prop)) {
          s[prop] = attrs[prop];
        }
      }
      s.appendChild(makeText(txt));
      s.addEventListener('mouseenter', mouseEnterWord);
      s.addEventListener('mouseleave', mouseLeaveWord);
      return s;
    };

    let idNum = 1;
    for (let i=0; i<textNodes.length; i++) {
      let n = textNodes[i];
      let txt = n.nodeValue;
      let words = txt.split(' ');

      insertBefore(makeSpan(words[0], {id:idNum++, className:"alexClass"}), n);
      for (let j=1; j<words.length; j++) {
        insertBefore(makeText(' '),n);
        insertBefore(makeSpan(words[j], {id:idNum++, className:"alexClass"}), n);
      }
      removeElement(n);
    }
  }

  let makeBottomDiv = () => {
    let bottomDiv = document.createElement('div');
    bottomDiv.id = "bottomDiv";
    bottomDiv.className = "invisible";

    bottomDiv.addEventListener('mouseenter', () => {
      console.log('entered bottomDiv')
      if (window.closeID) {
        clearTimeout(closeID);
      }
    })

    bottomDiv.addEventListener('mouseleave', (e) => {
      console.log('exited bottomDiv')
      closeTimer();
    })
    document.body.appendChild(bottomDiv);

  }



  makeBottomDiv();
  makeSpans();
});
