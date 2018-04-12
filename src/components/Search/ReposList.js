import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Row } from 'antd';

// components
import LoadingSinner from '../common/LoadingSpinner';
import RepoCard from './RepoCard';
import ErrorBox from '../common/ErrorBox';

const ReposList = ({
  isFetchingRepos,
  isErrorOccured,
  errorMessage,
  repositories
}) => {
  const isEmpty =
    !isFetchingRepos &&
    !isErrorOccured &&
    repositories &&
    repositories.length === 0;

  return (
    <SCListWrap>
      <LoadingSinner
        isLoading={isFetchingRepos}
        spinnerSize="large"
        alignOnCenter
      >
        {repositories && (
          <Row type="flex" align="top" gutter={16}>
            {repositories.map(repoData => (
              <RepoCard
                key={repoData.id}
                repoData={repoData}
                displayIssuesLink
              />
            ))}
          </Row>
        )}

        {isEmpty && (
          <SCEmptyResult>
            No results found :( Try another search criteria.
          </SCEmptyResult>
        )}

        {isErrorOccured && <ErrorBox errorMessage={errorMessage} />}
      </LoadingSinner>
    </SCListWrap>
  );
};

ReposList.propTypes = {
  isFetchingRepos: PropTypes.bool.isRequired,
  isErrorOccured: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  repositories: PropTypes.array
};

const SCListWrap = styled.div`
  width: 1000px;
  padding-top: 50px;
`;

const SCEmptyResult = styled.div`
  text-align: center;
  font-size: 18px;
`;

const mapStateToProps = ({ search }) => ({
  isFetchingRepos: search.isFetchingRepos,
  isErrorOccured: search.isErrorOccured,
  errorMessage: search.errorMessage,
  repositories: search.repositories
});

export default connect(mapStateToProps, null)(ReposList);
