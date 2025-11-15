// --------- MQTT FUNKTIONER -------moja2024 ------

const topic = "ASGBITOPIC";
const afsenderID = "iPhone";

const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

client.on("message", modtager);

client.on("connect", function () {
  client.subscribe(topic);
  console.log("MQTT OK");
});
