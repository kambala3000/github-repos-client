import { INIT_SEARCH, SET_SEARCH_RESULTS, SEARCH_ERROR_OCCURED } from './constants';

// api
import apiSearch from '../../api/search';

export const fetchRepos = searchQuery => {
  return async dispatch => {
    dispatch({ type: INIT_SEARCH });

    try {
      const response = await apiSearch.searchRepos(searchQuery);
      console.log(response.data.items);
      dispatch({ type: SET_SEARCH_RESULTS, payload: response.data.items });
    } catch (error) {
      const errorMessage = error.response.data.message;
      dispatch({ type: SEARCH_ERROR_OCCURED, payload: errorMessage });
      throw error;
    }
  };
};
