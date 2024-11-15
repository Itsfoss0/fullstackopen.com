const Book = require("./models/Book.models");
const Author = require("./models/Author.model");
const User = require("./models/User.model");
const Token = require("./models/Token.model");
const mongoose = require("mongoose");
const GraphQLError = require("graphql").GraphQLError;
const crypto = require("crypto");

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");
      const validBooks = books.filter((book) => book.author);

      if (books.length !== validBooks.length) {
        console.warn(
          `Found ${books.length - validBooks.length} books with missing authors`
        );
      }
      return validBooks;
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: async (root, args, { auth }) => {
      const bearerToken = auth.split(" ")[1];
      const token = await Token.findOne({ value: bearerToken });
      console.log(token)
      const user = await User.findOne({ username: token.username });
      return user;
    },
  },
  Mutation: {
    addBook: async (root, args, { auth }) => {
      const bearerToken = auth.split(" ")[1];
      const token = await Token.find({ value: bearerToken });
      if (token.length === 0) {
        throw new GraphQLError(
          { message: "unauthorized" },
          {
            extensions: {
              code: "UNAUTHORIZED",
            },
          }
        );
      }
      let authorId;
      const author = await Author.findOne({ name: args.author });
      if (author) {
        authorId = author._id;
      } else {
        const newAuthor = new Author({ name: args.author });
        await newAuthor.save();
        authorId = newAuthor._id;
      }
      try {
        const book = new Book({ ...args, author: authorId });
        await book.save();
        return book.populate("author");
      } catch (err) {
        console.log(err);
        if (err instanceof mongoose.Error.ValidationError) {
          throw new GraphQLError(
            { message: "title is too short" },
            {
              extensions: {
                code: "SHORT_BOOK_TITLE",
              },
            }
          );
        }
      }
    },
    editAuthorById: async (root, args, { auth }) => {
      const bearerToken = auth.split(" ")[1];
      const token = await Token.find({ value: bearerToken });
      const { id, born } = args;
      const author = await Author.findById(id);

      if (token.length === 0) {
        throw new GraphQLError(
          { message: "unauthorized" },
          {
            extensions: {
              code: "UNAUTHORIZED",
            },
          }
        );
      }

      if (!author) {
        throw new GraphQLError(
          { message: "Author not found" },
          {
            extensions: {
              code: "AUTHOR_NOT_FOUND",
            },
          }
        );
      }
      author.born = born;
      return author.save();
    },
    addAuthor: async (root, args, { auth }) => {
      const bearerToken = auth.split(" ")[1];
      const token = await Token.find({ value: bearerToken });

      if (token.length === 0) {
        throw new GraphQLError(
          { message: "unauthorized" },
          {
            extensions: {
              code: "UNAUTHORIZED",
            },
          }
        );
      }

      const { name, born } = args;
      const authorExists = await Author.exists({ name });
      if (authorExists) {
        throw new GraphQLError(
          { message: "author exists with that name" },
          {
            extensions: {
              code: "AUTHOR_EXISTS",
            },
          }
        );
      }
      try {
        const author = new Author({ name, born });
        await author.save();
        return author;
      } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
          throw new GraphQLError(
            { message: "author name  is too short" },
            {
              extensions: {
                code: "SHORT_AUTHOR_NAME",
              },
            }
          );
        }
      }
    },
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args;
      const userExists = await User.exists({ username });
      if (userExists) {
        throw new GraphQLError(
          { message: "user with that username exists" },
          {
            extensions: {
              code: "USERNAME_EXISTS",
            },
          }
        );
      }
      const user = new User({ username, favoriteGenre });
      return user.save();
    },
    login: async (root, args) => {
      const { username, password } = args;
      if (username && password === "secret") {
        const exists = await User.exists({ username });
        if (exists) {
          const value = crypto.randomBytes(12).toString("hex");
          const token = new Token({ value, username });
          return token.save();
        }
        throw new GraphQLError(
          { message: "username not found" },
          {
            extensions: {
              code: "USERNAME_NOT_FOUND",
            },
          }
        );
      }
      throw new GraphQLError(
        { message: "invalid credentials" },
        {
          extensions: {
            code: "INVALID_CREDENTIALS",
          },
        }
      );
    },
  },
};

module.exports = {
  resolvers,
};
