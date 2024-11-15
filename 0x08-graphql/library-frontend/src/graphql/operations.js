import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query allBooks {
    books: allBooks {
      title
      author {
        name
        id
      }
      id
      published
      genres
    }
    user: me {
      favoriteGenre
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
      author {
        name
        id
      }
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($author: ID!, $setBornTo: Int!) {
    author: editAuthorById(id: $author, born: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    resp: login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query me {
    user: me {
      favoriteGenre
      username
    }
  }
`;
