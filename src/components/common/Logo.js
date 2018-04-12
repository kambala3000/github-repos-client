import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// images
import GithubLogo from '../../static/images/github-logo.svg';

const Logo = () => {
  return (
    <SCHomeLink to="/">
      <SCLogoImage src={GithubLogo} alt="Github logo" />
      <span>GitHub repos API client</span>
    </SCHomeLink>
  );
};

const SCHomeLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 110px;
  padding: 20px 0 30px 0;
  text-decoration: none;
  color: #212121;
  font-family: 'Monospaced Number', sans-serif;
  font-size: 40px;
  transition: opacity 0.1s linear;
  &:hover {
    opacity: 0.7;
    color: #212121;
  }
`;

const SCLogoImage = styled.img`
  height: 60px;
  width: 60px;
  padding-right: 20px;
`;

export default Logo;
