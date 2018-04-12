import { CHANGE_SEARCH_LANG, INIT_SEARCH, SET_SEARCH_RESULTS } from './constants';

// api
import apiSearch from '../../api/search';

export const fetchRepos = searchQuery => {
  return async dispatch => {
    dispatch({ type: INIT_SEARCH });

    const response = await apiSearch.searchRepos(searchQuery);
    console.log(response.data.items);

    dispatch({ type: SET_SEARCH_RESULTS, payload: response.data.items });
  };
};
