import express from 'express';
import chalk from 'chalk';
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

server.get('/tweets', (request, response) => {
  const page = request.query.page;

  if(Number.isInteger(parseInt(page, 10))) {
    let numberFilterTweets = 10;

    let min = tweets.length - page * (numberFilterTweets + 1);
    let max = tweets.length - (page -1) * (numberFilterTweets + 1);

    const pageTweets = tweets.filter((tweet, index) => {
      return index > min && index <= max;
    }); 

    const invertedOfTweets = [...pageTweets].reverse();

    response.send(invertedOfTweets);
  } else {
    response.status(400).send("Verifique a página!")
  }

});

server.listen(5000, () => {
  console.log(chalk.bold.green("Servidor funcionando na porta 5000"))
});
