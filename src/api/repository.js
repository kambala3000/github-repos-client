import githubApi from './configureApi';
import { ISSUES_PER_PAGE_COUNTER } from '../utils/constants';

export default {
  fetchRepoInfo(id) {
    return githubApi.get(`/repositories/${id}`);
  },

  fetchRepoIssues(page, ownerLogin, repoName) {
    return githubApi.get(`/repos/${ownerLogin}/${repoName}/issues`, {
      params: {
        page,
        per_page: ISSUES_PER_PAGE_COUNTER
      }
    });
  }
};
