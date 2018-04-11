import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spin } from 'antd';

const LoadingSpinner = ({ isLoading, spinnerSize = 'default', alignOnCenter, children }) => {
  if (isLoading) {
    return (
      <STSpinnerWrap alignOnCenter={alignOnCenter}>
        <Spin size={spinnerSize} />
      </STSpinnerWrap>
    );
  }

  return children;
};

const STSpinnerWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ alignOnCenter }) => (alignOnCenter ? 'center' : 'flex-start')};
`;

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  spinnerSize: PropTypes.oneOf(['default', 'small', 'large']),
  alignOnCenter: PropTypes.bool
};

export default LoadingSpinner;
