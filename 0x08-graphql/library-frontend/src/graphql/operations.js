import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query allBooks {
    books: allBooks {
      title
      author {
        name
        id
      }
      published
      id
    }
  }
`;

export const ALL_AUTHORS = gql`
  query allAuthors {
    authors: allAuthors {
      name
      id
      born
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    book: addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($author: String!, $setBornTo: Int!) {
    author: editAuthor(author: $author, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
