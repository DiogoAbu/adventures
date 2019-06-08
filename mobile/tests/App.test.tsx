import React from 'react';
import 'react-native';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';

import App from '../src/App';

it('renders correctly', () => {
  renderer.create(<App />);
});
