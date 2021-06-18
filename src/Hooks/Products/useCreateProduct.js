import { gql, useMutation } from '@apollo/client';

export const MUTATION_CREATE_PRODUCT = gql`
  mutation GetProducts(
    $title: String!
    $imageUrls: [String!]!
    $description: String!
    $productType: String!
  ) {
    createProduct(
      productInput: {
        title: $title
        imageUrls: $imageUrls
        description: $description
        productType: $productType
      }
    ) {
      _id
      title
      imageUrls
      description
      productType
      creator {
        name
      }
      createdAt
    }
  }
`;

export const useCreateProduct = (
  title,
  imageUrls,
  description,
  productType
) => {
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
                  productType
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
