function createChant(goodthing) {
  // const anotherThing = "coffee";

  const cheer = (anotherThing) => {
    const chant = "We've got " + goodthing + " and " + anotherThing;
    console.log(chant);
  };
  return cheer("coffee");
}

createChant("bagels");
