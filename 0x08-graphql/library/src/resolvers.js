const Book = require('./models/Book.models');
const Author = require('./models/Author.model');

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { filter, limit } = args;
      const books = await Book.find({}).populate('author');
      return books;
    },
    allAuthors: async () => {
      return Author.find({});
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });
      await book.save();
      return book;
    },
    editAuthorById: async (root, args) => {
      const { id, born } = args;
      const author = await Author.findById(id);
      author.born = born;
      return author.save();
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      await author.save();
      return author;
    }
  }
};

module.exports = {
  resolvers
};
