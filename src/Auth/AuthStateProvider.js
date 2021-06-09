import React, { useState, useContext, createContext } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

let authToken = '';
const initial = {
  authState: { loggedIn: false },
  gqlError: { msg: '' },
  appSetLogin: () => {},
  appSetLogout: () => {},
  appSetAuthToken: token => {},
  appClearAuthToken: () => {},
};

export const AuthStateContext = createContext(initial);
const AuthStateProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ loggedIn: false, userId: '' });
  const [gqlError, setGqlError] = useState({ msg: '' });

  const appSetLogin = ({ token, userId }) => {
    authToken = token;
    setAuthState({ ...authState, loggedIn: true, userId: userId });
  };

  const appSetLogout = () => {
    authToken = '';
    setAuthState({ ...authState, loggedIn: false, userId: '' });
  };
  const appSetAuthToken = token => {
    authToken = token;
  };
  const appClearAuthToken = () => {
    authToken = '';
  };
  const appGetAuthToken = () => authToken;

  //appolo client
  const cache = new InMemoryCache({});
  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(operation => {
            operation.setContext({
              headers: { authorization: `Bearer ${appGetAuthToken()}` },
            });
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));
        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );
  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors === undefined || graphQLErrors[0].path === undefined)
          return;
        if (graphQLErrors[0].path[0] === 'refresh') return;
        const err = graphQLErrors[0].message;
        setGqlError({ msg: err });
      }),
      requestLink,
      new HttpLink({
        uri: 'http://localhost:8080/graphql',
        credentials: 'include',
      }),
    ]),
    cache,
  });

  return (
    <AuthStateContext.Provider
      value={{
        authState,
        gqlError,
        appSetLogin,
        appSetLogout,
        appSetAuthToken,
        appClearAuthToken,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthStateContext.Provider>
  );
};

export default AuthStateProvider;
