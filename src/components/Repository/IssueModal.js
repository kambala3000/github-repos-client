import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Modal, Button, Icon } from 'antd';

// store
import { closeIssueDetailsModal } from '../../store/Repository/actions';

// utils
import { formatDate } from '../../utils/methods';

class IssueModal extends Component {
  static propTypes = {
    closeIssueDetailsModal: PropTypes.func.isRequired,
    showDetailsModal: PropTypes.bool.isRequired,
    issueDetails: PropTypes.object
  };

  handleModalClose = () => {
    const { closeIssueDetailsModal } = this.props;
    closeIssueDetailsModal();
  };

  render() {
    const { showDetailsModal, issueDetails } = this.props;
    const {
      title,
      body,
      created_at,
      updated_at,
      labels,
      id,
      html_url
    } = issueDetails;
    const preparedCreateDate = formatDate(new Date(created_at));
    const preparedUpdatedate = formatDate(new Date(updated_at));

    const hasLabels = labels && labels.length > 0;
    const preparedLabels =
      hasLabels && labels.map(item => item.name).join(', ');

    return (
      <Modal
        title={`Issue #${id} details`}
        visible={showDetailsModal}
        onCancel={this.handleModalClose}
        footer={[
          <Button key="okBtn" onClick={this.handleModalClose}>
            Ok
          </Button>
        ]}
      >
        <p>
          <a href={html_url} target="_blank">
            Open on GitHub
            <SCLinkIcon type="link" />
          </a>
        </p>
        <p>
          <SCBoldText>Title: </SCBoldText>
          {title}
        </p>
        <p>
          <SCBoldText>Created at: </SCBoldText>
          {preparedCreateDate}
        </p>
        {hasLabels && (
          <p>
            <SCBoldText>Labels: </SCBoldText>
            {preparedLabels}
          </p>
        )}
        <p>
          <SCBoldText>Last update: </SCBoldText>
          {preparedUpdatedate}
        </p>
        <p>{body}</p>
      </Modal>
    );
  }
}

const SCBoldText = styled.span`
  font-weight: 600;
`;

const SCLinkIcon = styled(Icon)`
  padding-left: 5px;
`;

const mapStateToProps = ({ repository }) => ({
  showDetailsModal: repository.showDetailsModal,
  issueDetails: repository.issueDetails
});

export default connect(mapStateToProps, { closeIssueDetailsModal })(IssueModal);
