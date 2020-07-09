const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
app.use(express.json());
const server = http.Server(app);
const io = socketIO(server);
console.log("Server Running on localhost:3000");
console.log("API:");
console.log("Add (GET), Remove (GET), PopulateStock (POST)");

//Escuta o Backend e manda ordens pra o Client

app.post("/Add", (req, res) => {
  io.emit("add", req.query.id);
  console.log("Adicionou Produto com ID: " + req.query.id);
  res.sendStatus(200);
});
app.post("/Remove", (req, res) => {
  io.emit("remove", req.query.id);
  console.log("Removeu Produto com ID:" + req.query.id);
  res.sendStatus(200);
});
app.post("/PopulateStock", (req, res) => {
  io.emit("populateStock", req.body);
  console.log(req.body);
  console.log("Populou Estoque");
  res.sendStatus(200);
});
server.listen(3000);

//Inicializa o Backend quando o cliente faz Login

io.sockets.on("connection", function (socket) {
  socket.on("start", function (data) {
    console.log("Enviado Start para o Backend");
    io.emit("startSuccess");
  });
});
