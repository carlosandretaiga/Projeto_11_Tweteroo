import express from 'express';
import chalk from 'chalk';
import cors from 'cors';

const server = express(); 

server.use(express.json());
server.use(cors());

const users = [];
const tweets = [];

server.post("/sign-up", (request, response) => {
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

server.post("/tweets", (request, response) => {
  const body = request.body;
  const {username, tweet} = body;

  if(!body.tweet) {
    response.status(400).send("Verifique. Todos os campos são obrigatórios!");
  } else {
    const {avatar} = users.find((user) => user.username === username);
    const newPostTweet = {
      username,
      avatar,
      tweet
    }
    tweets.push(newPostTweet);
    response.status(201).send("Ok!");
  }
})

server.get("/tweets", (request, response) => {
if(tweets.length <= 10) {
  response.status(200).send([...tweets].reverse());
} else {
  response.status(200).send([...tweets].reverse().splice(0, 10));
}

});

server.listen(5000, () => {
  console.log(chalk.bold.green("Servidor funcionando na porta 5000"))
});
