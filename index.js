import express from 'express';
import cors from 'cors';

const server = express(); 

server.use(express.json());
server.use(cors());

//global variables 
const users = [];
const tweets = [];

server.post('/sign-up', (request, response) => {
  const {username, avatar} = request.body;

  if(!username || !avatar) {
    response.status(400).send("Verifique. Todos os campos são obrigatórios!");
  } else if(users.find((user) => user.username === username)) {
    response.status(400).send("Este usuário já existe. Por favor escolha outro.");
  } else {
    users.push({username, avatar});
    response.status(200).send("Ok! Usuário cadastrado!");
  }

});

server.listen(5000);
