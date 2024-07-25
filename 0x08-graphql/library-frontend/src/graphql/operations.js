import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
  query allBooks {
    books: allBooks {
      title
      author
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
      bookCount
    }
  }
`;

export const ADD_BOOK = gql`
    mutation addBook ($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    book: addBook(title: $title, author: $author, published: $published, genres: $genres){
        title
        author
        published
        genres
    }
}
`;
