import './App.css';
import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import Layout from './Layout/Layout';
import { Redirect, Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('./containers/Home/Home'));
const Contact = React.lazy(() => import('./containers/contact/Contact'));
const Products = React.lazy(() => import('./containers/products/Products'));
const Testimonials = React.lazy(() =>
  import('./components/testimonials/Testimonials')
);
const About = React.lazy(() => import('./containers/about/About'));
const TongueAndGroove = React.lazy(() =>
  import('./containers/products/TongueAndGroove/TongueAndGroove')
);
const ClickFlooring = React.lazy(() =>
  import('.//containers/products/ClickFlooring/ClickFlooring')
);

const Adhesives = React.lazy(() =>
  import('./containers/products/Adhesives/Adhesives')
);

const Underlay = React.lazy(() =>
  import('./containers/products/Underlay/Underlay')
);

const App = props => {
  let routes = (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/underlay" component={Underlay} />
        <Route path="/adhesives" component={Adhesives} />
        <Route path="/tng" component={TongueAndGroove} />
        <Route path="/clickflooring" component={ClickFlooring} />
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
