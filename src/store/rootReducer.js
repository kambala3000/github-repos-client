import { combineReducers } from 'redux';
import search from './Search/reducer';
import repository from './Repository/reducer';

export default combineReducers({
  search,
  repository
});
