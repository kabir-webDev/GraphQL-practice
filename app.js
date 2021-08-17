const express = require("express");
const dotenv = require("dotenv");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });

  app.use((req, res) => {
    res.send("Hello from express apollo server");
  });

  await mongoose.connect("mongodb://localhost:27017/post_db", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  console.log("Mongoose Connected... 😄");

  app.listen(process.env.PORT, () => {
    console.log("Server is Running");
  });
}

startServer();

//Server
