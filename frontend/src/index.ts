// tslint:disable-next-line:no-implicit-dependencies no-submodule-imports
import 'resize-observer-polyfill/dist/ResizeObserver.global';

import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';

import App from './App';

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(App as any);
