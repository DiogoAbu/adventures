import React from 'react';

// tslint:disable-next-line:no-implicit-dependencies
import { shallow } from 'enzyme';

import { App } from '../src/App';

describe('<App />', () => {
  it('matches its snapshot', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
