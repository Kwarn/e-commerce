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
  appState: { loggedIn: false },
  gqlError: { msg: '' },
  appSetLogin: token => {},
  appSetLogout: () => {},
  appSetAuthToken: token => {},
  appClearAuthToken: () => {},
};

const AppStateContext = createContext(initial);
const AuthStateProvider = ({ children }) => {
  const [appState, setAppState] = useState({ loggedIn: false });
  const [gqlError, setGqlError] = useState({ msg: '' });

  const appSetLogin = token => {
    authToken = token;
    setAppState({ ...appState, loggedIn: true });
  };

  const appSetLogout = () => {
    authToken = '';
    setAppState({ ...appState, loggedIn: false });
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
        uri: 'http://localhost:4000/graphql',
        credentials: 'include',
      }),
    ]),
    cache,
  });

  return (
    <AppStateContext.Provider
      value={{
        appState,
        gqlError,
        appSetLogin,
        appSetLogout,
        appSetAuthToken,
        appClearAuthToken,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AppStateContext.Provider>
  );
};

export default AuthStateProvider;
