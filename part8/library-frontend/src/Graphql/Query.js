import { gql } from "@apollo/client";

const bookDetail = gql`
  fragment bookDetail on Book {
    title
    published
    author {
      name
      id
      born
      bookCount
    }
    id
    genres
  }
`;
export const bookAddSubcription = gql`
  subscription Subscription {
    bookAdded {
      ...bookDetail
    }
  }
  ${bookDetail}
`;

export const ALLBOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      ...bookDetail
    }
  }
  ${bookDetail}
`;

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
export const NEWBOOK = gql`
  mutation Mutation(
    $title: String!
    $published: Int!
    $genres: [String!]!
    $author: String
  ) {
    addBook(
      title: $title
      published: $published
      genres: $genres
      author: $author
    ) {
      title
      published
      genres
    }
  }
`;
