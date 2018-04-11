import { CHANGE_SEARCH_LANG, INIT_SEARCH, SET_SEARCH_RESULTS } from './constants';

const initialState = {
  isFetchingRepos: false,
  repositories: [],
  langFilter: ''
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_SEARCH_LANG:
      return { ...state, langFilter: payload };
    case INIT_SEARCH:
      return { ...state, isFetchingRepos: true };
    case SET_SEARCH_RESULTS:
      return { ...state, repositories: payload, isFetchingRepos: false };
    default:
      return state;
  }
}
