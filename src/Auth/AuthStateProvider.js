import React, { useState, createContext, useEffect } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// Apollo-client setup
// This is a higher order component which provides the app authentication information context.

let authToken = "";
const initial = {
  authState: { loggedIn: false },
  gqlError: { msg: "" },
  appSetLogin: () => {},
  appSetLogout: () => {},
  appSetAuthToken: (token) => {},
  appClearAuthToken: () => {},
  appGetAuthToken: () => authToken,
};

export const AuthStateContext = createContext(initial);
const AuthStateProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ loggedIn: false, userId: "" });
  const [gqlError, setGqlError] = useState({ msg: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expiryDate = localStorage.getItem("expiryDate");

    if (!token || !expiryDate) return;

    if (new Date(expiryDate) <= new Date()) {
      appSetLogout();
      return;
    }
    if (token && userId) {
      appSetLogin({ token: token, userId: userId });
    }

    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

    appSetAutoLogout(remainingMilliseconds);
  }, []);

  const appSetAutoLogout = (milliseconds) => {
    setTimeout(() => {
      appSetLogout();
    }, milliseconds);
  };

  const appSetLogin = ({ token, userId }) => {
    authToken = token;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem("expiryDate", expiryDate.toISOString());
    setAuthState({ ...authState, loggedIn: true, userId: userId });
  };

  const appSetLogout = () => {
    authToken = "";
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    setAuthState({ ...authState, loggedIn: false, userId: "" });
  };
  const appSetAuthToken = (token) => {
    authToken = token;
  };
  const appClearAuthToken = () => {
    authToken = "";
  };
  const appGetAuthToken = () => authToken;

  //appolo client
  const cache = new InMemoryCache();

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle;
        Promise.resolve(operation)
          .then((operation) => {
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
  const errorLink = onError((e) => {
    console.log(e);
  });
  const client = new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([
      errorLink,
      requestLink,
      new HttpLink({
        uri: "http://localhost:8080/graphql",
        credentials: "include",
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
        appGetAuthToken,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthStateContext.Provider>
  );
};

export default AuthStateProvider;
