import React, { Component } from 'react';
import styled from 'styled-components';

import RequestList from '../requests';
import ViewTree from '../view-tree';

const Styles = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  & > .title {
    color: orange;
    border-bottom: 2px solid orange;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

class Console extends Component {
  render() {
    return (
      <Styles>
        <h1 className="title">Kitsune</h1>
        <ViewTree/>
        <RequestList/>
      </Styles>
    );
  }
}

export default Console;
