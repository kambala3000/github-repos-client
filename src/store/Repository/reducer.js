import {
  INIT_REPO_INFO_FETCH,
  SET_REPO_INFO,
  REPO_INFO_FETCH_ERROR_OCCURED,
  INIT_ISSUES_PAGE_FETCH,
  SET_ISSUES_BY_PAGE,
  OPEN_ISSUE_DETAILS_MODAL,
  CLOSE_ISSUE_DETAILS_MODAL
} from './constants';

const initialState = {
  isFetchingRepoInfo: false,
  isFetchingIssuesPage: false,
  repoData: {},
  repoIssues: null,
  isErrorOccured: false,
  currentPage: 1,
  errorMessage: '',
  showDetailsModal: false,
  issueDetails: {}
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_REPO_INFO_FETCH:
      return { ...state, isFetchingRepoInfo: true, isErrorOccured: false };
    case SET_REPO_INFO:
      return {
        ...state,
        isFetchingRepoInfo: false,
        isFetchingIssuesPage: false,
        isErrorOccured: false,
        currentPage: 1,
        repoData: payload.repoData,
        repoIssues: payload.repoIssues
      };
    case REPO_INFO_FETCH_ERROR_OCCURED:
      return {
        ...state,
        isFetchingRepoInfo: false,
        isErrorOccured: true,
        errorMessage: payload,
        repoData: {},
        repoIssues: null
      };
    case INIT_ISSUES_PAGE_FETCH:
      return { ...state, isFetchingIssuesPage: true };
    case SET_ISSUES_BY_PAGE:
      return {
        ...state,
        isFetchingIssuesPage: false,
        currentPage: payload.currentPage,
        repoIssues: payload.repoIssues
      };
    case OPEN_ISSUE_DETAILS_MODAL:
      return {
        ...state,
        showDetailsModal: true,
        issueDetails: payload
      };
    case CLOSE_ISSUE_DETAILS_MODAL:
      return {
        ...state,
        showDetailsModal: false
      };
    default:
      return state;
  }
}
