/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import logger from 'redux-logger';
import './index.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './Reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const middleware = process.env.NODE_ENV === 'development' ? [thunk, logger] : [thunk];

const store = createStore(rootReducer, devTools, applyMiddleware(...middleware));

const appWrapper = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(appWrapper, document.getElementById('root'));
registerServiceWorker();
