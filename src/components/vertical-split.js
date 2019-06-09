import React, { Component } from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  .pane {
    &.active .frame {
      border: 2px solid yellow;
    }

    flex-grow: 1;

    display: flex;
    flex-direction: column;

    .header {
      padding: 4px;
    }

    .frame {
      flex-grow: 1;
      padding: 4px;

      border: 2px solid dimgrey;
      border-radius: 8px;
    }
  }

  .pane:nth-child(1) {
    margin-right: 4px;
  }
`;

const Pane = props => {
  let className = 'pane';
  if(props.active)
    className += ' active';

  return (
    <div className={className}>
      <div className="header">{props.header}</div>
      <div className="frame">
        {props.children}
      </div>
    </div>
  );
};

export default class VerticalSplit extends Component {
  render() {
    const leftIcon = <><kbd>A</kbd> Left</>;
    const rightIcon = <><kbd>S</kbd> Right</>;

    const { activeView, children: { left, right } } = this.props;

    return (
      <Styles>
        <Pane active={activeView === 'left'} header={leftIcon}>
          <div>This is in left</div>
          {left}
        </Pane>
        <Pane active={activeView === 'right'} header={rightIcon}>
          This is in right
          {right}
        </Pane>
      </Styles>
    );
  }
}
