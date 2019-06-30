import React, { useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider as ReduxProvider } from 'react-redux';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { PersistGate } from 'redux-persist/integration/react';
import { createClient, Provider as UrqlProvider } from 'urql';

import { Loading, PrivateRoute } from './components';
import { Campaigns, CreateAnAccount, SignIn } from './screens';
import createStore from './store';
import { dark, light } from './theme';
import { cacheFonts, cacheImages } from './utils/cacheAssets';
import { Route, Router, Switch } from './utils/router';

const client = createClient({
  url: 'http://192.168.2.100:4000',
});

const App: React.FC = () => {
  const { persistor, store } = createStore();

  const [isReady, setIsReady] = useState(false);

  const init = async () => {
    // Get persisted theme
    const { theme } = store.getState();

    await EStyleSheet.build(theme === 'light' ? light : dark);

    await Promise.all([
      ...cacheImages([require('../assets/icon.png')]),
      ...cacheFonts([MaterialCommunityIcons.font]),
    ]);
  };

  const onFinish = () => setIsReady(true);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={init}
        onFinish={onFinish}
        // tslint:disable-next-line:no-console
        onError={console.warn}
      />
    );
  }

  return (
    <UrqlProvider value={client}>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
          <Router>
            <Switch>
              <Route exact={true} path='/' component={SignIn} />
              <Route
                exact={true}
                path='/create-an-account'
                component={CreateAnAccount}
              />

              <PrivateRoute
                exact={true}
                path='/campaigns'
                component={Campaigns}
              />
            </Switch>
          </Router>
        </PersistGate>
      </ReduxProvider>
    </UrqlProvider>
  );
};

export default App;
