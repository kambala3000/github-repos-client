import {
  INIT_REPO_INFO_FETCH,
  SET_REPO_INFO,
  REPO_INFO_FETCH_ERROR_OCCURED,
  INIT_ISSUES_PAGE_FETCH,
  SET_ISSUES_BY_PAGE,
  OPEN_ISSUE_DETAILS_MODAL,
  CLOSE_ISSUE_DETAILS_MODAL
} from './constants';

// api
import apiRepository from '../../api/repository';

export const getRepoInfo = repoId => {
  return async dispatch => {
    dispatch({ type: INIT_REPO_INFO_FETCH });

    try {
      const { data: repoData } = await apiRepository.fetchRepoInfo(repoId);
      const { name, owner } = repoData;

      const { data: repoIssues } = await apiRepository.fetchRepoIssues(
        1,
        owner.login,
        name
      );
      dispatch({ type: SET_REPO_INFO, payload: { repoData, repoIssues } });
    } catch (error) {
      const errorMessage = error.response.data.message;
      dispatch({ type: REPO_INFO_FETCH_ERROR_OCCURED, payload: errorMessage });
      throw error;
    }
  };
};

export const getIssuesByPage = (page, ownerLogin, repoName) => {
  return async dispatch => {
    dispatch({ type: INIT_ISSUES_PAGE_FETCH });

    const { data: repoIssues } = await apiRepository.fetchRepoIssues(
      page,
      ownerLogin,
      repoName
    );

    dispatch({
      type: SET_ISSUES_BY_PAGE,
      payload: { currentPage: page, repoIssues }
    });
  };
};

export const openIssueDetailsModal = issueDetails => ({
  type: OPEN_ISSUE_DETAILS_MODAL,
  payload: issueDetails
});

export const closeIssueDetailsModal = issueDetails => ({
  type: CLOSE_ISSUE_DETAILS_MODAL
});
