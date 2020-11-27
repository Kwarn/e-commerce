import './App.css';
import React from 'react';
import Home from './containers/Home/Home';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import Layout from './Layout/Layout';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Suspense } from 'react';

const Contact = React.lazy(() => import('./containers/contact/Contact'));
const Products = React.lazy(() => import('./containers/products/Products'));
const Testimonials = React.lazy(() =>
  import('./components/testimonials/Testimonials')
);
const AboutUs = React.lazy(() => import('./components/aboutUs/AboutUs'));

const App = props => {
  let routes = (
    <Switch>
      <Route
        path="/contact"
        render={() => (
          <Suspense fallback={<div>Something Went Wrong...</div>}>
            <Contact />
          </Suspense>
        )}
      />
      <Route
        path="/products"
        render={() => (
          <Suspense fallback={<div>Something Went Wrong...</div>}>
            <Products />
          </Suspense>
        )}
      />
      <Route
        path="/testimonials"
        render={() => (
          <Suspense fallback={<div>Something Went Wrong...</div>}>
            <Testimonials />
          </Suspense>
        )}
      />
      <Route
        path="/aboutus"
        render={() => (
          <Suspense fallback={<div>Something Went Wrong...</div>}>
            <AboutUs />
          </Suspense>
        )}
      />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>{routes}</Layout>
    </ThemeProvider>
  );
};

export default App;
