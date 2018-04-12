import { INIT_SEARCH, SET_SEARCH_RESULTS, SEARCH_ERROR_OCCURED } from './constants';

const initialState = {
  isFetchingRepos: false,
  repositories: null,
  isErrorOccured: false,
  errorMessage: ''
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_SEARCH:
      return { ...state, isFetchingRepos: true, isErrorOccured: false };
    case SET_SEARCH_RESULTS:
      return { ...state, repositories: payload, isFetchingRepos: false, isErrorOccured: false };
    case SEARCH_ERROR_OCCURED:
      return {
        ...state,
        repositories: null,
        isFetchingRepos: false,
        isErrorOccured: true,
        errorMessage: payload
      };
    default:
      return state;
  }
}
