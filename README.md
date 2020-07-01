# SuperDoFuturo
Front do projeto de Reconhecimento de produtos via YoLo
* Requisitos
  * Conexão ativa com a internet (Pode ser contornado facilmente disponibilizando localmente Jquery, Bootsrap e socket.io para o client)
  * Node instalado na máquina. (https://nodejs.org/en/)
  * Backend responsável pela lógica e capaz de informar os enventos ao servidor. (https://github.com/Scheffel-V/SuperFuturo)
* Montar Ambiente:
  * Client:
    * Abrir Index.html no Navegador
    * Editar em script.js o estoque inicial / Produtos disponiveis
  * Server:
    * Instalar Dependencias: *npm install* (Deve instalar automaticamente os itens abaixo) 
      * express (https://expressjs.com/pt-br/)
      * socket.io (https://socket.io/)
    * Rodar o Servidor: *node server.js*

* Instruções de Uso
  * Adicionar Item no Carrinho
    * Com o server rodando, realizar uma chamada GET http://127.0.0.1:3000/Add?id=1
    * Substituir id pelo ID do produto que deseja mover do estoque para o carrinho
  * Remover Item do Carrinho 
    * Com o server rodando, realizar uma chamada GET http://127.0.0.1:3000/Remove?id=1
    * Substituir id pelo ID do produto que deseja mover do carrinho para o estoque.
    
* Melhorias propostas
  * Refatorar o código.
  * Melhorar Layout.
  * Tornar disponivel localmente (Não necessitar de acesso a internet).
  * Permitir que o backend inicialize o estoque via JSON.
