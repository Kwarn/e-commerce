import { gql } from '@apollo/client';

export const MUTATION_CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $title: String!
    $imageUrls: [String!]!
    $description: String!
  ) {
    createProduct(
      productInput: {
        title: $title
        imageUrls: $imageUrls
        description: $description
      }
    ) {
      _id
      title
      imageUrls
      description
      creator {
        name
      }
      createdAt
    }
  }
`;
