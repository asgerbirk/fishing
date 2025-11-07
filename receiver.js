function modtager(topic, modtagetBesked) {
  let modtagerBuffer = JSON.parse(modtagetBesked);
  console.log("topic" + topic);
  let afsender = modtagerBuffer.from;
  console.log("Modtager buffer" + modtagerBuffer.from);
  let value = modtagerBuffer.val;
  console.log("MODTAGET fra " + afsender + ": " + value); // <-- Ændret  // gør noget med value
}
