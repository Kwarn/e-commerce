import { gql, useQuery } from '@apollo/client';

export const QUERY_GET_PRODUCTS = gql`
  query GetProducts($productType: String!) {
    getProducts(productType: $productType) {
      products {
        _id
        title
        imageUrls
        description
        productType
      }
    }
  }
`;

export const useGetProducts = productType => {
  const { data } = useQuery(QUERY_GET_PRODUCTS, {
    variables: { productType },
  });
  return data?.getProducts?.products;
};
