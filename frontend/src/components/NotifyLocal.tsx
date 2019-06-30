import React from 'react';
import { Text, TextProps, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { animated, useSpring } from 'react-spring/native';

import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export interface Props extends TextProps {
  text: string;
  brand?: 'info' | 'success' | 'warning' | 'danger';
}

const AnimatedView = animated(View);

const NotifyLocal: React.FC<Props> = ({ text, brand, ...rest }) => {
  const animStyle = useSpring({ opacity: 1, from: { opacity: 0 } });

  let brandVariable;
  let iconName;

  if (brand === 'info') {
    brandVariable = '$infoFaded';
    iconName = 'information';
  } else if (brand === 'success') {
    brandVariable = '$successFaded';
    iconName = 'check';
  } else if (brand === 'warning') {
    brandVariable = '$warningFaded';
    iconName = 'alert-octagon';
  } else if (brand === 'danger') {
    brandVariable = '$dangerFaded';
    iconName = 'bug-outline';
  }

  return (
    // @ts-ignore
    <AnimatedView
      style={[
        styles.container,
        brandVariable && {
          backgroundColor: EStyleSheet.value(brandVariable),
        },
        animStyle,
      ]}
    >
      <Icon style={styles.icon} name={iconName} />
      <Text style={styles.text} {...rest}>
        {text}
      </Text>
    </AnimatedView>
  );
};

NotifyLocal.defaultProps = {
  brand: 'danger',
};

const styles = EStyleSheet.create({
  container: {
    margin: '$grid',
    paddingVertical: '$gridSmallest',
    paddingHorizontal: '$gridSmaller',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '$borderRadius',
    minWidth: 200,
  },

  text: {
    textAlign: 'center',
    color: '$textColor',
  },

  icon: {
    fontSize: 24,
    color: '$textColor',
    paddingRight: '$gridSmallest',
  },
});

export default React.memo(NotifyLocal);
