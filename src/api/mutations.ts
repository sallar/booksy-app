export const AddBookToShelf = `
  mutation ($shelfId: ID!, $internalBookId: ID!) {
    createUserBook(data: {
      shelves:{
        connect: [$shelfId]
      },
      source: {
        connect: $internalBookId
      }
    }) {
      source {
        googleBookId
      }
    }
  }
`;
