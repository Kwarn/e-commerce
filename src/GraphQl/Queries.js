import { gql } from '@apollo/client';

export const QUERY_LOGIN = gql`
  query UserLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
    }
  }
`;
