import gql from 'graphql-tag';

export const AddBookToShelf = gql`
  mutation($shelfId: ID!, $internalBookId: ID!) {
    addBookToShelf(shelfID: $shelfId, bookID: $internalBookId) {
      ts
    }
  }
`;
