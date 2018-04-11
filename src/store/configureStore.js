import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export default function configureStore(initialState) {
  const devtools = window['devToolsExtension'] ? window['devToolsExtension']() : f => f;

  return createStore(rootReducer, initialState, compose(applyMiddleware(thunk), devtools));
}
