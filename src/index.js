import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import registerServiceWorker from './utils/registerServiceWorker';

// styles
import './styles/main.css';

// routes
import AppRoutes from './AppRoutes';

// store
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
