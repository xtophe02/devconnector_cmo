const express = require("express");
const next = require("next");
const { ApolloServer, gql } = require("apollo-server-express");
require("dotenv").config();

const db = require('./db')
const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== "production";
const appNext = next({ dev });
const handle = appNext.getRequestHandler();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => "hello world"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

appNext.prepare().then(() => {
  const app = express();
  server.applyMiddleware({ app });
  // app.get('/a', (req, res) => {
  //   return appNext.render(req, res, '/a', req.query)
  // })

  // app.get('/b', (req, res) => {
  //   return appNext.render(req, res, '/b', req.query)
  // })

  // app.get('/posts/:id', (req, res) => {
  //   return appNext.render(req, res, '/posts', { id: req.params.id })
  // })

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  //CONNECT MONGO AND LISTEN 4000
  db.initDb((err, db) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
      });
    }
  });
});
