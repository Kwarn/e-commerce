import { gql, useMutation } from '@apollo/client';

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

export const useCreateProduct = (title, imageUrls, description) => {
  const [createProduct] = useMutation(MUTATION_CREATE_PRODUCT, {
    update(cache, { data: { createProduct } }) {
      cache.modify({
        fields: {
          products(existingProducts = []) {
            const newProductRef = cache.writeFragment({
              data: createProduct,
              fragment: gql`
                fragment NewProduct on Product {
                  id
                  title
                  imageUrls
                  description
                }
              `,
            });
            return [...existingProducts, newProductRef];
          },
        },
      });
    },
  });
  return createProduct;
};
