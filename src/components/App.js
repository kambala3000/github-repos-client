import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

class App extends Component {
  render() {
    return (
      <SCAppWrap>
        <Button type="primary">Button</Button>
      </SCAppWrap>
    );
  }
}

const SCAppWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default App;
