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
const AboutUs = React.lazy(() => import('./components/aboutUs/AboutUs'));

const App = props => {
  let routes = (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/aboutus" component={AboutUs} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>{routes}</Layout>
    </ThemeProvider>
  );
};

export default App;
