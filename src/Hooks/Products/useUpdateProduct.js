import { gql, useMutation } from "@apollo/client";

export const MUTATION_UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $_id: ID!
    $title: String!
    $imageUrls: [String!]!
    $description: String!
    $productType: String!
  ) {
    updateProduct(
      productInput: {
        _id: $_id
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

export const useUpdateProduct = (
  _id,
  title,
  imageUrls,
  description,
  productType
) => {
  const [updateProduct] = useMutation(MUTATION_UPDATE_PRODUCT, {
    update(cache, { data: { updateProduct } }) {
      cache.modify({
        fields: {
          products(existingProducts = []) {
            const newProductRef = cache.writeFragment({
              data: updateProduct,
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
  return updateProduct;
};
