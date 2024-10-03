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
  resolvers,
  formatError: (formatError, error) => {
    switch (formatError.extensions.code) {
      case 'SHORT_AUTHOR_NAME':
        return { message: 'author name is too short' };
      case 'SHORT_BOOK_TITLE':
        return { message: 'book title is too short' };
      case 'AUTHOR_NOT_FOUND':
        return { message: 'author not found' };
      case 'AUTHOR_EXISTS':
        return { message: 'author with that name already exists' };
      case 'USERNAME_EXISTS':
        return { message: 'username is already taken' };
      case 'INVALID_CREDENTIALS':
        return { message: 'invalid username or password' };
      case 'USERNAME_NOT_FOUND':
        return { message: 'user not found' };
      case 'UNAUTHORIZED':
        return { message: 'unauthorized' };
      default:
        return formatError;
    }
  }
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => ({
    auth: req.headers.authorization
  })
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
