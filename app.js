require("./secrets.js");

const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const morgan = require("morgan");

const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.js");

const mongoose = require("mongoose");

const connectionURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}-pw1c5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set('debug', true);
mongoose.connection.once("open", () => {
  console.log("connected to database!!!");
});

// prepare to create database schema for collections and documents;

// graphqlHTTP is a function, which takes in an options object, that will fire off on every incoming request;
// middleware for express; takes an options object or function as input to configure behavior, and returns an express middleware;

// if you navigate to this endpoint, at this point in time, this will be the output on the client;

/*

{
  "errors": [
    {
      "message": "GraphQL middleware options must contain a schema."
    }
  ]
}

after passing in the schema, and then hitting the "/graphql" endpoint, this will be the error message we see on the client:

{
  "errors": [
    {
      "message": "Must provide query string."
    }
  ]
}

// so now we have a schema, but we need to provide a query in order to "enter" and "walk" through the schema;

*/

// enable cross-origin resource sharing;
app.use(cors());
app.use(morgan("dev"));

app.use("/graphql", graphqlHTTP({
  schema, // schema: schema;
  graphiql: true // a boolean to optionally enable GraphiQL mode, a core IDE;
}));

app.listen(PORT, () => {
  console.log(`now listening for requests on port: ${PORT}`)
});