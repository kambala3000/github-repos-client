import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Col, Icon } from 'antd';

const RepoCard = ({ style, repoData, displayIssuesLink }) => {
  const {
    name,
    description,
    language,
    stargazers_count,
    open_issues_count,
    id,
    html_url
  } = repoData;
  const displayIssues = displayIssuesLink && !!open_issues_count;
  const hasFooter = language || displayIssues;
  const cardBodyStyles = { padding: '16px 24px 8px 24px' };

  return (
    <Col span={8} style={style}>
      <SCCard
        title={name}
        bodyStyle={cardBodyStyles}
        extra={
          stargazers_count > 0 ? (
            <div>
              <Icon type="star" />
              <SCStarsCounter>{stargazers_count}</SCStarsCounter>
            </div>
          ) : null
        }
      >
        {description && <SCDescription>{description}</SCDescription>}
        {hasFooter && (
          <SCCardFooter>
            {language && (
              <SCLangWrap>
                <SCFlagIcon type="flag" />
                <span>{language}</span>
              </SCLangWrap>
            )}

            {displayIssues && (
              <Link to={`/repository/${id}`}>
                <SCIssuesCounter>
                  Watch {open_issues_count} issues..
                </SCIssuesCounter>
                <Icon type="question-circle-o" />
              </Link>
            )}

            {!displayIssuesLink && (
              <a href={html_url} target="_blank">
                Open on GitHub
                <SCLinkIcon type="link" />
              </a>
            )}
          </SCCardFooter>
        )}
      </SCCard>
    </Col>
  );
};

RepoCard.propTypes = {
  repoData: PropTypes.object.isRequired,
  displayIssuesLink: PropTypes.bool
};

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

const SCLinkIcon = styled(Icon)`
  padding-left: 5px;
`;

export default RepoCard;
