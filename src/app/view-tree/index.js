import React, { Component } from 'react';
import { connect } from 'react-redux';

import { superMap } from '../../core';
import { getViewState } from '../store';
import { getViewConfig } from './config';

class ViewTree extends Component {
  buildView(viewId) {
    const { activeView, children = [], props } = getViewState(viewId) || {};
    const childViews = superMap(children, viewId => this.buildView(viewId));

    const viewConfig = getViewConfig(viewId, true);

    const View = viewConfig.view;
    return <View viewId={viewId} activeView={activeView} {...props}>{childViews}</View>;
  }

  render() {
    const { activeView } = this.props;
    return this.buildView(activeView);
  }
}

// Action
export default connect(state => state.viewTree)(ViewTree);
