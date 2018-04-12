import React from 'react';
import styled from 'styled-components';

// components
import Logo from '../common/Logo';
import RepoInfo from './RepoInfo';

const Repository = () => {
  return (
    <SCRepoInfoWrap>
      <Logo />
      <RepoInfo />
    </SCRepoInfoWrap>
  );
};

const SCRepoInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default Repository;
