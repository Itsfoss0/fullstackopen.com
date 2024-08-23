const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');

const { DB_URL } = require('./config/secrets');
const { resolvers } = require('./resolvers');
const { typeDefs } = require('./types');

mongoose
  .connect(DB_URL)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error(`An error occured ${err}`));

const server = new ApolloServer({
  typeDefs,
  resolvers
});

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
