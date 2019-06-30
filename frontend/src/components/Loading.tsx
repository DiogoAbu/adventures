import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name='circle' />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$bgColor',
  },
  icon: {
    color: '$textColor',
  },
});

export default Loading;
