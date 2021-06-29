import { gql, useMutation } from '@apollo/client';

export const MUTATION_DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: ID!) {
    deleteProduct(productId: $productId) {
      productId
    }
  }
`;

export const useDeleteProduct = productId => {
  const [deleteProduct] = useMutation(MUTATION_DELETE_PRODUCT, {
    update(cache, { data: { deleteProduct } }) {
      cache.evict({ _id: deleteProduct.productId });
      cache.gc();
    },
  });
  return deleteProduct;
};
