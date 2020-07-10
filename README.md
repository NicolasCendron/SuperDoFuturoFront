# SuperDoFuturo

Front do projeto de Reconhecimento de produtos via YoLo

- Requisitos
  - Conexão ativa com a internet (Pode ser contornado facilmente disponibilizando localmente Jquery, Bootsrap e socket.io para o client)
  - Node instalado na máquina. (https://nodejs.org/en/)
  - Backend responsável pela lógica e capaz de informar os enventos ao servidor. (https://github.com/Scheffel-V/SuperFuturo)
- Montar Ambiente:

  - Client:
    - Abrir Index.html no Navegador
    - Editar em script.js o estoque inicial / Produtos disponiveis
  - Server:
    - Instalar Dependencias: _npm install_ (Deve instalar automaticamente os itens abaixo)
      - express (https://expressjs.com/pt-br/)
      - socket.io (https://socket.io/)
    - Rodar o Servidor: _node server.js_

- Instruções de Uso
  - Adicionar Item no Carrinho
    - Com o server rodando, realizar uma chamada POST http://127.0.0.1:3000/Add?id=1
    - Substituir id pelo ID do produto que deseja mover do estoque para o carrinho
  - Remover Item do Carrinho
    - Com o server rodando, realizar uma chamada POST http://127.0.0.1:3000/Remove?id=1
    - Substituir id pelo ID do produto que deseja mover do carrinho para o estoque.
  - Popular Estoque
    - Com o server rodando, realizar uma chamada POST http://127.0.0.1:3000/PopulateStock
    - Passar um JSON no body no seguinte formato (Futuramente retiraremos o ID e indexaremos pelo nome)

```json
{
  "produtos": [
    { "id": "1", "nome": "Ades", "quantidade": "49", "preco": "4.50" },
    { "id": "2", "nome": "Visconti", "quantidade": "23", "preco": "3.00" },
    { "id": "3", "nome": "Italac", "quantidade": "34", "preco": "4.50" }
  ]
}
```

- Melhorias propostas
  - Refatorar o código.
  - Melhorar Layout.
  - Tornar disponivel localmente (Não necessitar de acesso a internet).
  - Permitir que o backend inicialize o estoque via JSON.
