import React from 'react';
import styled from 'styled-components';

// components
import Logo from '../common/Logo';
import SearchInput from './SearchInput';
import ReposList from './ReposList';

const Search = () => {
  return (
    <SCAppWrap>
      <Logo />
      <SearchInput />
      <ReposList />
    </SCAppWrap>
  );
};

const SCAppWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default Search;
