import './App.css';
import React from 'react';
import Home from './containers/Home/Home';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import Layout from './Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';
import Products from './containers/products/Products';

const Contact = React.lazy(() => import('./containers/contact/Contact'));

function App() {
  let routes = (
    <Switch>
      <Route
        path="/contact"
        render={() => (
          <Suspense fallback={<div>Something Went Wrong...</div>}>
            <Contact hasOwnWrapper={true} />
          </Suspense>
        )}
      />
      <Route path="/products" render={() => <Products />} />
      <Route path="/" render={() => <Home />} />
    </Switch>
  );
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Layout>{routes}</Layout>
      </>
    </ThemeProvider>
  );
}

export default App;
