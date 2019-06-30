import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useDispatch } from 'react-redux';

import { Button } from '../components';
import { useTypedSelector } from '../hooks';
import { setToken } from '../reducers/auth';
import { BackButton, RouteComponentProps } from '../utils/router';

const Campaigns: React.FC<RouteComponentProps & {}> = () => {
  const dispatch = useDispatch();

  // Get token
  const token = useTypedSelector((state) => state.auth.token);

  const onSignOut = useCallback(() => {
    dispatch(setToken(null));
  }, []);

  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.text}>Campaigns</Text>

      {token && (
        <React.Fragment>
          <Text style={styles.text}>{token}</Text>
          <Button title='Sign out' onPress={onSignOut} />
        </React.Fragment>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    margin: '$gridSmaller',
    color: '$textColor',
  },
});

export default Campaigns;
