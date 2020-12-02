import './App.css';
import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import Layout from './Layout/Layout';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

const Home = React.lazy(() => import('./containers/Home/Home'));
const Contact = React.lazy(() => import('./containers/contact/Contact'));
const Products = React.lazy(() => import('./containers/products/Products'));
const Testimonials = React.lazy(() =>
  import('./components/testimonials/Testimonials')
);
const About = React.lazy(() => import('./containers/about/About'));

const App = props => {
  let routes = (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/testimonials" component={Testimonials} />
        <Route path="/products" component={Products} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/home" component={Home} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </Switch>
    </Suspense>
  );
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>{routes}</Layout>
    </ThemeProvider>
  );
};

export default App;
