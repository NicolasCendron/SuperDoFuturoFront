const optionsLocale = { style: "currency", currency: "BRL" };

var socket = io.connect("http://127.0.0.1:3000", { secure: true });

function pegaQuantidadeTr($tr) {
  const $tdsAtuais = $($tr.find("td"));
  return parseInt($($tdsAtuais.get(2)).html(), 10);
}
function pegaValorTr($tr) {
  const $tdsAtuais = $($tr.find("td"));
  const valor = parseFloat(
    $($tdsAtuais.get(3)).html().replace(",", ".").split(";")[1]
  );
  return valor;
}
function calculaTotalCarrinho() {
  let valorTotal = 0;
  let qtdeTotal = 0;
  let valorAtual = 0;
  let qtdeAtual = 0;
  const $rowsLista = $("#tableLista > tbody > tr");
  $rowsLista.each((k, tr) => {
    qtdeAtual = pegaQuantidadeTr($(tr));
    qtdeTotal += qtdeAtual;
    valorAtual = pegaValorTr($(tr));
    valorTotal += qtdeAtual * valorAtual;
    console.log(qtdeAtual);
  });

  $("#qtdeTotalCompra").html(qtdeTotal);
  $("#valorTotalCompra").html(
    valorTotal.toLocaleString("pt-BR", optionsLocale)
  );
}
function calculaTotalEstoque() {
  let valorTotal = 0;
  let qtdeTotal = 0;
  let valorAtual = 0;
  let qtdeAtual = 0;
  const $rowsLista = $("#tableEstoque > tbody > tr");
  $rowsLista.each((k, tr) => {
    qtdeAtual = pegaQuantidadeTr($(tr));
    qtdeTotal += qtdeAtual;
    valorAtual = pegaValorTr($(tr));
    valorTotal += qtdeAtual * valorAtual;
  });

  $("#qtdeTotalEstoque").html(qtdeTotal);
  $("#valorTotalEstoque").html(
    valorTotal.toLocaleString("pt-BR", optionsLocale)
  );
}

function populaListaDeCompras(json) {
  limpaTable($("#tableLista > tbody > tr"));
  const oLista = json.produtos;
  for (let i = 0; i < oLista.length; i++) {
    oLista[i].quantidade = "0";
    addLine($("#tableLista"), oLista[i]);
  }
  calculaTotalCarrinho();
}

function populaEstoque(json) {
  limpaTable($("#tableEstoque > tbody > tr"));
  const oLista = json.produtos;
  for (let i = 0; i < oLista.length; i++) {
    const qtde = parseInt(oLista[i].quantidade);
    addLine($("#tableEstoque"), oLista[i]);
  }
  calculaTotalEstoque();
}

function limpaTable($listTrs) {
  $listTrs.remove();
}

function incrementaItem(rowLista) {
  const arrTD = $(rowLista).find("td");
  const td = $(arrTD)[2];
  const valor = parseInt($(td).html(), 10);
  $(td).html(valor + 1);

  $(rowLista).addClass("bg-success");
  setTimeout(function () {
    $(rowLista).removeClass("bg-success");
  }, 1000);
}
function decrementaItem(rowLista) {
  const arrTD = $(rowLista).find("td");
  const td = $(arrTD)[2];
  const valor = parseInt($(td).html(), 10);
  $(td).html(valor - 1);

  $(rowLista).addClass("bg-danger");
  setTimeout(function () {
    $(rowLista).removeClass("bg-danger");
  }, 1000);
}
function addLine(table, p) {
  const html =
    "<tr>" +
    "<td>" +
    p.id +
    "</td>" +
    "<td>" +
    p.nome +
    "</td>" +
    '<td class="text-right">' +
    p.quantidade +
    "</td>" +
    '<td class="text-right">' +
    parseFloat(p.preco).toLocaleString("pt-BR", optionsLocale) +
    "</td></tr>";
  table.find("tbody").append(html);
}

function colocaNomeCliente() {
  if (localStorage.getItem("strUsuario") !== undefined) {
    $("#nome_cliente").html("de " + localStorage.getItem("strUsuario"));
  }
}

$("#btnFinalizarCompra").on("click", () => {
  console.log($("#valorTotalCompra").val());
  localStorage.setItem("strValorCompra", $("#valorTotalCompra").html());
  window.open("checkout.html", "_self");
});

$(document).ready(function () {
  var jsonEstoque = {
    produtos: [
      { id: "1", nome: "Ades", quantidade: "49", preco: "4.50" },
      { id: "2", nome: "Visconti", quantidade: "23", preco: "3.00" },
      { id: "3", nome: "Italac", quantidade: "34", preco: "4.50" },
    ],
  };
  colocaNomeCliente();
  populaEstoque(jsonEstoque);
  populaListaDeCompras(jsonEstoque);
  console.log("Start");
  socket.emit("start");

  socket.on("add", function (id) {
    const rowLista = $("#tableLista > tbody > tr")[parseInt(id, 10) - 1];
    const rowEstoque = $("#tableEstoque > tbody > tr")[parseInt(id, 10) - 1];

    incrementaItem(rowLista);
    decrementaItem(rowEstoque);
    calculaTotalCarrinho();
    calculaTotalEstoque();
    console.log("Adicionou " + id);
  });

  socket.on("remove", function (id) {
    const rowLista = $("#tableLista > tbody > tr")[parseInt(id, 10) - 1];
    const rowEstoque = $("#tableEstoque > tbody > tr")[parseInt(id, 10) - 1];

    incrementaItem(rowEstoque);
    decrementaItem(rowLista);

    calculaTotalEstoque();
    calculaTotalCarrinho();
    console.log("Removeu" + id);
  });

  socket.on("populateStock", function (jsonListaCompras) {
    console.log(jsonListaCompras);
    populaEstoque(jsonListaCompras);
    populaListaDeCompras(jsonListaCompras);
    console.log("Populou Estoque");
  });

  socket.on("startSuccess", function (jsonListaCompras) {
    console.log("Autorizado Login");
  });
});
