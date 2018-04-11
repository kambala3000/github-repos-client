import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Col, Icon } from 'antd';

class RepoCard extends Component {
  static propTypes = {
    repoData: PropTypes.object.isRequired
  };

  renderStars = () => {
    const { stargazers_count } = this.props.repoData;

    if (stargazers_count > 0) {
      return (
        <div>
          <Icon type="star" />
          <SCStarsCounter>{stargazers_count}</SCStarsCounter>
        </div>
      );
    }

    return null;
  };

  render() {
    const { style, repoData } = this.props;
    const { name, description, language, open_issues_count, id } = repoData;
    const hasOpenedIssues = !!open_issues_count;
    const hasFooter = language || hasOpenedIssues;
    const starsBlock = this.renderStars();

    return (
      <Col span={8} style={style}>
        <SCCard title={name} bodyStyle={{ padding: '16px 24px 8px 24px' }} extra={starsBlock}>
          {description && <SCDescription>{description}</SCDescription>}
          {hasFooter && (
            <SCCardFooter>
              {language && (
                <SCLangWrap>
                  <SCFlagIcon type="flag" />
                  <span>{language}</span>
                </SCLangWrap>
              )}
              {hasOpenedIssues && (
                <Link to={`/repository/${id}`}>
                  <SCIssuesCounter>Watch {open_issues_count} issues..</SCIssuesCounter>
                  <Icon type="question-circle-o" />
                </Link>
              )}
            </SCCardFooter>
          )}
        </SCCard>
      </Col>
    );
  }
}

const SCCard = styled(Card)`
  margin-bottom: 20px !important;
  border-color: #d1d5da !important;
`;

const SCStarsCounter = styled.span`
  padding-left: 3px;
`;

const SCDescription = styled.div`
  padding-bottom: 16px;
`;

const SCCardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SCLangWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SCFlagIcon = styled(Icon)`
  margin-right: 5px;
  font-size: 16px;
`;

const SCIssuesCounter = styled.span`
  margin-right: 5px;
`;

export default RepoCard;
