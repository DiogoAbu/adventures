import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BackButton } from '../utils/router';

function Campaigns() {
  return (
    <View style={styles.container}>
      <BackButton />
      <Text>Campaigns</Text>
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

export default Campaigns;
