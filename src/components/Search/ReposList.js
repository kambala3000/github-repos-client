import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Row } from 'antd';

// components
import LoadingSinner from '../common/LoadingSpinner';
import RepoCard from './RepoCard';

const ReposList = ({ isFetchingRepos, repositories }) => {
  return (
    <SCListWrap>
      <LoadingSinner isLoading={isFetchingRepos} spinnerSize="large" alignOnCenter>
        <Row type="flex" align="top" gutter={16}>
          {repositories.map(repoData => <RepoCard key={repoData.id} repoData={repoData} />)}
        </Row>
      </LoadingSinner>
    </SCListWrap>
  );
};

ReposList.propTypes = {
  isFetchingRepos: PropTypes.bool.isRequired,
  repositories: PropTypes.array.isRequired
};

const SCListWrap = styled.div`
  width: 1000px;
  padding-top: 50px;
`;

const mapStateToProps = ({ search }) => ({
  isFetchingRepos: search.isFetchingRepos,
  repositories: search.repositories
});

export default connect(mapStateToProps, null)(ReposList);
