import React, { useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import Campaigns from './screens/Campaigns';
import SignIn from './screens/SignIn';
import { cacheFonts, cacheImages } from './utils/cache';
import { Route, Router, Switch } from './utils/router';

function App() {
  const [isReady, setIsReady] = useState(false);

  const cacheAssetsAsync = async () => {
    const imageAssets = cacheImages([require('../assets/icon.png')]);

    const fontAssets = cacheFonts([MaterialCommunityIcons.font]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  const onFinish = () => setIsReady(true);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={cacheAssetsAsync}
        onFinish={onFinish}
        // tslint:disable-next-line:no-console
        onError={console.warn}
      />
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={SignIn} />
        <Route exact={true} path="/campaigns" component={Campaigns} />
      </Switch>
    </Router>
  );
}

export default App;
