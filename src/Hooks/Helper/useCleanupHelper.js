import { gql, useMutation } from "@apollo/client";

export const MUTATION_CLEANUP_HELPER = gql`
  mutation CleanupHelper($productIdArray: [ID!]!) {
    cleanupHelper(productIdArray: $productIdArray)
  }
`;

export const useCleanupHelper = (productIdArray) => {
  const [cleanupHelper] = useMutation(MUTATION_CLEANUP_HELPER);
  return cleanupHelper;
};
