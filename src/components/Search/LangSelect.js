import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select } from 'antd';

// constants
import { LANGUAGES_MAP } from '../../utils/constants';

const LangSelect = ({ defaultValue = '', onSelect }) => {
  return (
    <SCSelectWrap>
      <SCSelect defaultValue={defaultValue} onChange={onSelect}>
        {LANGUAGES_MAP.map(({ value, title }) => (
          <Select.Option key={value} value={value}>
            {title}
          </Select.Option>
        ))}
      </SCSelect>
    </SCSelectWrap>
  );
};

LangSelect.propTypes = {
  defaultValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

const SCSelectWrap = styled.div`
  margin-right: 10px;
`;

const SCSelect = styled(Select)`
  width: 140px !important;
`;

export default LangSelect;
