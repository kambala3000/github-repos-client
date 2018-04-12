import { INIT_SEARCH, SET_SEARCH_RESULTS } from './constants';

const initialState = {
  isFetchingRepos: false,
  repositories: [],
  isErrorOccured: false
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_SEARCH:
      return { ...state, isFetchingRepos: true, isErrorOccured: false };
    case SET_SEARCH_RESULTS:
      return { ...state, repositories: payload, isFetchingRepos: false, isErrorOccured: false };
    default:
      return state;
  }
}
