import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Link } from '../utils/router';

function SignIn() {
  return (
    <View style={styles.container}>
      <Link to="/campaigns">
        <Text>SignIn</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignIn;
