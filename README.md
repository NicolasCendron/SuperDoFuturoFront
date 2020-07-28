# SuperDoFuturo

Product recognition using YoLo
Front End

# Requirements
  - Active connection with the Internet (Can be solved making Jquery, Bootsrap and socket.io available locally in the client folder)
  - Node Installed locally. (https://nodejs.org/en/)
  - Downloading the Backend responsible for the logic and capable of firing events to the server. (https://github.com/Scheffel-V/SuperFuturo)

# Setup:

  - Client:
    - Open Index.html on your browser.
  - Server:
    - Install dependencies: _npm install_ (Should install these packages)
      - express (https://expressjs.com/pt-br/)
      - socket.io (https://socket.io/)
    - Run node Server: _node server.js_
      - Standart port 3000
      - _node server.js -p DESIRED_PORT_

# Instructions for use
  - Add Item to Cart
    - With the Node Server running, call POST http://127.0.0.1:3000/Add?nome="PRODUCT_NAME"
    - Replace PRODUCT_NAME for the product you wish to move from stock to cart.
  - Remove Item From Cart
    - With the Node Server running, call  POST http://127.0.0.1:3000/Remove?nome="PRODUCT_NAME"
    - Replace PRODUCT_NAME for the product you wish to move from cart to stock.
  - Populate Stock
    - With the Node Server running, call  POST http://127.0.0.1:3000/PopulateStock
    - Passar um JSON no body no seguinte formato (Futuramente retiraremos o ID e indexaremos pelo nome)

```json
{
  "produtos": [
    { "nome": "Ades", "quantidade": "49", "preco": "4.50" },
    { "nome": "Visconti", "quantidade": "23", "preco": "3.00" },
    { "nome": "Italac", "quantidade": "34", "preco": "4.50" }
  ]
}
```

# Next Steps
  -  Make Jquery, Bootsrap and socket.io available locally in the client folder to ditch the need for active internet connection;
