const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://fran:Chance5123!@ds215338.mlab.com:15338/gql-test');
mongoose.connection.once('open', () => {
  console.log("Connected to database");
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, ()=>{
  console.log("listening on port 4000");
});