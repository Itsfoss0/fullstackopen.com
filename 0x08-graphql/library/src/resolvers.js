const { books, authors } = require('./db');
const { v1: uuid } = require('uuid');

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      return books.filter((book) => {
        let authorMatch = true;
        let genreMatch = true;

        if (args.author) {
          authorMatch = book.author === args.author;
        }

        if (args.genre) {
          genreMatch = book.genres.includes(args.genre);
        }

        return authorMatch && genreMatch;
      });
    },
    allAuthors: () => {
      return authors.map((author) => {
        const bookCount = books.filter(
          (book) => book.author === author.name
        ).length;
        return { ...author, bookCount };
      });
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() };
      if (!authors.find((author) => author.name === args.author)) {
        const author = { name: args.author, id: uuid(), bookCount: 1 };
        authors.push(author);
      }
      books.push(book);
      return book;
    },
    editAuthor: (root, args) => {
      const authorIndex = authors.findIndex(
        (author) => author.name === args.author
      );
      if (authorIndex === -1) {
        return;
      }
      const updatedAuthor = { ...authors[authorIndex], born: args.setBornTo };
      authors[authorIndex] = updatedAuthor;
      return updatedAuthor;
    }
  }
};

module.exports = {
  resolvers
};
