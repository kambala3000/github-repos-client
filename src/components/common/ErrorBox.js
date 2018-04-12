import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorBox = ({ errorMessage }) => {
  return (
    <SCErrorBlock>
      <p>Error!</p>
      <p>Reason: {errorMessage}</p>
    </SCErrorBlock>
  );
};

ErrorBox.propTypes = {
  errorMessage: PropTypes.string
};

const SCErrorBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  p {
    width: 520px;
  }
  p:first-child {
    text-align: center;
    font-weight: 800;
  }
`;

export default ErrorBox;
