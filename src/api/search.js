import githubApi from './configureApi';

export default {
  searchRepos(searchQuery) {
    return githubApi.get('/search/repositories', {
      params: {
        q: searchQuery
      }
    });
  }
};
