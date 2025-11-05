function modtager(topic, modtagetBesked) {
  let modtagerBuffer = JSON.parse(modtagetBesked);
  let afsender = modtagerBuffer.from;
  let value = modtagerBuffer.val;
  console.log("MODTAGET fra " + afsender + ": " + value); // <-- Ændret  // gør noget med value
}
