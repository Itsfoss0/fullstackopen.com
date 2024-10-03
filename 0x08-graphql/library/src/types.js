const typeDefs = `#graphql
  type Author{
      name: String!
      born: Int
      id: ID!
      bookCount: Int!
  }

  type Book {
  title: String!
  author: Author!
  published: Int!
  genres: [String!]!
  id: ID!
  }


  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
      addBook (
          title: String!
          author: String!
          published: Int!
          genres: [String!]!
      ) : Book!
      addAuthor (name: String! born: Int): Author
      editAuthorById(id: ID! born: Int!): Author
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
  }
`;

module.exports = {
  typeDefs
};
