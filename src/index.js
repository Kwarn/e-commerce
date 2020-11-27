import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import salesDataReducer from './store/ducks/salesData';
import App from './App';

const rootReducer = combineReducers({
  salesData: () => ({}),
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// sagaMiddleware.run(watchSalesData)
// sagaMiddleware.run(watchSalesTallyData)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
