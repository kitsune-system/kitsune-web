import React from 'react';
import { shallow } from 'enzyme';

import App from './index';

describe('App', () => {
  it('should render properly', () => {
    const wrapper = shallow(<App/>);
    wrapper.html().should.equal('<h1>Hello World</h1>');
  });
});
