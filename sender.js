function sender(x) {
  besked = {
    from: afsenderID,
    val: x,
  };
  client.publish(topic, JSON.stringify(besked));
}

function mouseClicked() {
  sender(mouseX);
  console.log("klick" + sender);
}
