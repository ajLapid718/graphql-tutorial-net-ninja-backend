const express = require("express");
const app = express();
const PORT = 4000;

const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.js");

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

*/

app.use("/graphql", graphqlHTTP({
  schema // schema: schema;
}));

app.listen(PORT, () => {
  console.log(`now listening for requests on port: ${PORT}`)
});