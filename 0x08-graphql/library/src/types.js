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
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String genre: String): [Book!]!
    allAuthors: [Author!]!
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
  }
`;

module.exports = {
  typeDefs
};
