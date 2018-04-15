import './requests.scss';

import _ from 'lodash';
import React, { Component } from 'react';

import TextRangeEntry from './text-range-entry';
import { rules } from '../rules';

import Requests from '../../services/requests';

export const requests = Requests();

export default class RequestList extends Component {
  constructor(props) {
    super(props);

    const reqList = requests.get();
    this.state = { reqList };

    requests.listen(reqList => this.setState({ reqList }));
  }

  render() {
    const reqList = _.map(this.state.reqList, (req, key) => {
      const resolve = value => req.resolve(value);
      const reject = value => req.reject(value);

      const { type, meta } = req;

      let keyCheck;
      if(type === 'text')
        keyCheck = rules('enter shift');

      return (
        <TextRangeEntry key={key} keyCheck={keyCheck} onConfirm={resolve} onCancel={reject}>
          {meta.header}
        </TextRangeEntry>
      );
    });

    return reqList.length ? <div className="requests">{reqList.reverse()}</div> : null;
  }
}
