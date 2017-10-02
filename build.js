document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded');
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

  const alertText = (e) => {
    let el = e.target;
    if (el.childNodes.length <= 1) {
      let preText = e.target.innerHTML;
      let begReg = /^\W+/;
      let endReg = /\W+$/;
      let text = preText.replace(begReg, "").replace(endReg, "");
      getEtym(text)
      .then(result => {
        let d = document.createElement('div');
        d.className = "popup"
        d.innerHTML = result;
        el.appendChild(d);
      })
    };
    if (el.childNodes[1]) {
      el.childNodes[1].focus();
    };
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
      s.addEventListener('mouseenter', alertText)
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

  makeSpans();
  let bottomDiv = document.createElement('div');
  bottomDiv.id = "bottomDiv";
  document.body.appendChild(bottomDiv);
});
