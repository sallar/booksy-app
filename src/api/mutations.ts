export const CreateBookSource = `
  mutation ($data: BookSourceInput!) {
    createBookSource (data: $data) {
      _id
      googleBookId
    }
  }
`;
