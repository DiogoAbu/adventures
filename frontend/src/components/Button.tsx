import React, { useEffect, useRef } from 'react';
import {
  GestureResponderEvent,
  Platform,
  StyleProp,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  animated,
  config as springConfig,
  useSpring,
} from 'react-spring/native';

import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export interface Props extends TouchableWithoutFeedbackProps {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  brand?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'blue'
    | 'violet'
    | 'orange'
    | 'cyan';
}

const AnimatedText = animated(Text);
const AnimatedIcon = animated(Icon);

const Button: React.FC<Props> = ({
  title,
  textStyle,
  iconStyle,
  style,
  onPress,
  disabled,
  brand,
  ...rest
}) => {
  const { animValue } = useSpring({ animValue: disabled ? 1 : 0 });

  const loadingRef = useRef<any>(null);
  const { loopValue } = useSpring({
    ref: loadingRef,
    from: { loopValue: 0 },
    to: async (next) => {
      while (1) {
        await next({ loopValue: 1 });
        await next({ loopValue: 0 });
      }
    },
    config: springConfig.stiff,
  });

  const brandVariable =
    brand === 'primary'
      ? '$primary'
      : brand === 'secondary'
      ? '$secondary'
      : brand === 'tertiary'
      ? '$tertiary'
      : brand === 'info'
      ? '$info'
      : brand === 'success'
      ? '$success'
      : brand === 'warning'
      ? '$warning'
      : brand === 'danger'
      ? '$danger'
      : brand === 'blue'
      ? '$blue'
      : brand === 'violet'
      ? '$violet'
      : brand === 'orange'
      ? '$orange'
      : brand === 'cyan'
      ? '$cyan'
      : null;

  const onPressProxy = (event: GestureResponderEvent): void => {
    if (onPress) {
      onPress(event);
    }
  };

  // Toggle loading animation based on disabled prop
  useEffect(() => {
    if (loadingRef && loadingRef.current) {
      if (disabled) {
        loadingRef.current.start();
      } else {
        loadingRef.current.stop();
      }
    }
  }, [disabled]);

  return (
    <TouchableWithoutFeedback
      {...rest}
      onPress={onPressProxy}
      disabled={disabled}
    >
      <View
        style={[
          styles.container,
          brandVariable && {
            backgroundColor: EStyleSheet.value(brandVariable),
          },
          disabled && styles.disabledContainer,
          style,
        ]}
      >
        {/*
        // @ts-ignore */}
        <AnimatedText
          selectable={false}
          style={[
            styles.text,
            textStyle,
            { opacity: animValue.interpolate([0, 1], [1, 0]) },
          ]}
        >
          {title}
        </AnimatedText>
        {/*
        // @ts-ignore */}
        <AnimatedIcon
          ref={loadingRef}
          name='circle-medium'
          selectable={false}
          style={[
            styles.icon,
            iconStyle,
            {
              opacity: animValue.interpolate([0, 1], [0, 1]),
              transform: [
                { translateX: loopValue.interpolate([0, 1], [-10, 10]) },
              ],
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

Button.defaultProps = {};

const styles = EStyleSheet.create({
  container: {
    margin: '$grid',
    backgroundColor: '$primary',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '$borderRadius',
    minWidth: 200,
  },

  disabledContainer: Platform.OS === 'web' && {
    cursor: 'progress',
  },

  text: {
    textAlign: 'center',
    paddingVertical: '$gridSmaller',
    paddingHorizontal: '$gridSmaller',
    color: '$textColor',
    fontWeight: '600',
  },

  icon: {
    position: 'absolute',
    fontSize: 24,
    color: '$textColor',
  },
});

export default React.memo(Button);
