const WebSocket = require("ws");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

let price = 0;

const ws = new WebSocket("wss://stream.binance.com:9443/ws/atausdt@trade");
// let stockPriceElement = document.getElementById("stock-price");

// let lastPrice = null;
// ws.onmessage = (event) => {
//   let stockObject = JSON.parse(event.data);
//   let price = parseFloat(stockObject.p).toFixed(4);
//   stockPriceElement.innerText = price;

//   stockPriceElement.style.color =
//     !lastPrice || lastPrice === price
//       ? "black"
//       : price > lastPrice
//       ? "green"
//       : "red";
//   lastPrice = price;
// };

ws.on("open", function open() {
  console.log("Connected.");
});

ws.on("message", function incoming(data) {
  const stockObject = JSON.parse(data);
  price = parseFloat(stockObject.p).toFixed(4);
  console.log("Price:", price);
});

app.get("/", (req, res) => {
  res.send(`Example app listening on port ${price}`);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
\


const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public")); // Serve static files from the 'public' directory

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

