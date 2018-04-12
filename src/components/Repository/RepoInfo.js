import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Table } from 'antd';

// components
import LoadingSinner from '../common/LoadingSpinner';
import RepoCard from '../Search/RepoCard';
import IssueModal from './IssueModal';
import ErrorBox from '../common/ErrorBox';

// store
import {
  getRepoInfo,
  getIssuesByPage,
  openIssueDetailsModal
} from '../../store/Repository/actions';

// constants
import { ISSUES_PER_PAGE_COUNTER } from '../../utils/constants';

class RepoInfo extends Component {
  static propTypes = {
    isFetchingRepoInfo: PropTypes.bool.isRequired,
    isFetchingIssuesPage: PropTypes.bool.isRequired,
    repoData: PropTypes.object,
    repoIssues: PropTypes.array,
    currentPage: PropTypes.number.isRequired,
    isErrorOccured: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    getRepoInfo: PropTypes.func.isRequired,
    getIssuesByPage: PropTypes.func.isRequired,
    openIssueDetailsModal: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { match, getRepoInfo } = this.props;
    const { id } = match.params;
    getRepoInfo(id);
  }

  handleTablePageClick = pagination => {
    const { repoData, getIssuesByPage } = this.props;
    const { name, owner } = repoData;
    getIssuesByPage(pagination.current, owner.login, name);
  };

  handleDetailsModal = issueDetails => {
    const { openIssueDetailsModal } = this.props;
    openIssueDetailsModal(issueDetails);
    console.log(issueDetails);
  };

  renderRowActions = (text, rowData) => {
    return <a onClick={() => this.handleDetailsModal(rowData)}>View details</a>;
  };

  render() {
    const {
      repoData,
      repoIssues,
      currentPage,
      isFetchingRepoInfo,
      isFetchingIssuesPage,
      isErrorOccured,
      errorMessage
    } = this.props;

    const columns = [
      { title: 'Issue id', dataIndex: 'id', key: 'id', width: 110 },
      { title: 'Title', dataIndex: 'title', key: 'title' },
      {
        title: 'Actions',
        key: 'actions',
        width: 110,
        render: this.renderRowActions
      }
    ];
    const { open_issues_count } = repoData;

    const pagination = {
      current: currentPage,
      pageSize: ISSUES_PER_PAGE_COUNTER,
      total: open_issues_count
    };

    return (
      <div>
        <LoadingSinner
          isLoading={isFetchingRepoInfo}
          spinnerSize="large"
          alignOnCenter
        >
          {!isErrorOccured ? (
            <SCLayout>
              <RepoCard repoData={repoData} style={{ width: '795px' }} />
              <SCTable
                columns={columns}
                dataSource={repoIssues}
                rowKey={item => item.id}
                pagination={pagination}
                loading={isFetchingIssuesPage}
                onChange={this.handleTablePageClick}
              />
              <IssueModal />
            </SCLayout>
          ) : (
            <ErrorBox errorMessage={errorMessage} />
          )}
        </LoadingSinner>
      </div>
    );
  }
}

const SCLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SCTable = styled(Table)`
  width: 795px !important;
`;

const mapStateToProps = ({ repository }) => ({
  isFetchingRepoInfo: repository.isFetchingRepoInfo,
  isFetchingIssuesPage: repository.isFetchingIssuesPage,
  repoData: repository.repoData,
  repoIssues: repository.repoIssues,
  currentPage: repository.currentPage,
  isErrorOccured: repository.isErrorOccured,
  errorMessage: repository.errorMessage
});

export default withRouter(
  connect(mapStateToProps, {
    getRepoInfo,
    getIssuesByPage,
    openIssueDetailsModal
  })(RepoInfo)
);
