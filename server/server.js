const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
app.use(express.json());
const server = http.Server(app);
const io = socketIO(server);

let PORT = 3000;

try {
  PORT = process.argv[3];
} catch {
  PORT = 3000;
}
console.log("Server Running on localhost:3000");
console.log("API:");
console.log("Add (POST), Remove (POST), PopulateStock (POST)");
console.log("http://127.0.0.1:" + PORT + '/Add?nome="NOME_PRODUTO"');
console.log("http://127.0.0.1:" + PORT + '/Remove?nome="NOME_PRODUTO"');
console.log("http://127.0.0.1:" + PORT + "/PopulateStock");
console.log(`{
  "produtos": [
    { "nome": "Ades", "quantidade": "49", "preco": "4.50" },
    { "nome": "Visconti", "quantidade": "23", "preco": "3.00" },
    { "nome": "Italac", "quantidade": "34", "preco": "4.50" }
  ]
}`);
//Escuta o Backend e manda ordens pra o Client

app.post("/Add", (req, res) => {
  io.emit("add", req.query.nome);
  console.log("Adicionou Produto com Nome: " + req.query.nome);
  res.sendStatus(200);
});
app.post("/Remove", (req, res) => {
  io.emit("remove", req.query.nome);
  console.log("Removeu Produto com Nome:" + req.query.nome);
  res.sendStatus(200);
});
app.post("/PopulateStock", (req, res) => {
  io.emit("populateStock", req.body);
  console.log(req.body);
  console.log("Populou Estoque");
  res.sendStatus(200);
});
server.listen(PORT);

//Inicializa o Backend quando o cliente faz Login

io.sockets.on("connection", function (socket) {
  socket.on("start", function (data) {
    console.log("Enviado Start para o Backend");
    io.emit("startSuccess");
  });
});
