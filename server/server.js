const express = require("express");
const next = require("next");
const { ApolloServer, gql } = require("apollo-server-express");
require("dotenv").config();
const multer = require('multer')

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== "production";
const appNext = next({ dev });
const handle = appNext.getRequestHandler();

const connectDb = require("./db");
const typeDefs = require("./graphql/schema.js");
const resolvers = require("./graphql/resolvers");
const UserModel = require('./models/User')


//IMAGE STORAGE
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//APOLLO SERVER INIT
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context(request){
    return{
      request,
      UserModel
    }
  }
});

//NEXT APP INIT
appNext.prepare().then(() => {
  const app = express();

  //MONGO INIT
  connectDb()
  server.applyMiddleware({ app });

  //IMAGE MIDDLEWARE
  // app.use(
  //   multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
  // );
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

  app.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
