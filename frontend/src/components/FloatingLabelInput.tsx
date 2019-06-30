import React from 'react';
import {
  Platform,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { animated, useSpring } from 'react-spring/native';

export interface Error {
  [key: string]: string;
}

export interface Props extends TextInputProps {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  infoStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  info?: string;
  error?: string | Error;
}

const AnimatedText = animated(Text);
const AnimatedView = animated(View);

const FloatingLabelInput = React.forwardRef<TextInput, Props>(
  (
    {
      label,
      containerStyle,
      labelStyle,
      infoStyle,
      errorStyle,
      style,
      onChangeText,
      info,
      error,
      autoCompleteType,
      ...rest
    },
    ref,
  ) => {
    const [{ animValue }, runAnimation] = useSpring(() => ({ animValue: 0 }));
    const { errorValue } = useSpring({ errorValue: error ? 1 : 0 });

    const onChangeTextProxy = (text: string): void => {
      runAnimation({ animValue: text ? 1 : 0 });
      if (onChangeText) {
        onChangeText(text);
      }
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {/* tslint:disable-line:prettier
        // @ts-ignore */}
        <AnimatedText
          style={[
            styles.label,
            labelStyle,
            {
              opacity: animValue,
              transform: [
                { translateY: animValue.interpolate([0, 1], [3, 0]) },
              ],
            },
          ]}
        >
          {label}
        </AnimatedText>

        <TextInput
          ref={ref}
          style={[styles.input, error && styles.inputErrorBorder, style]}
          placeholder={label}
          placeholderTextColor={EStyleSheet.value('$inputTextColorFaded')}
          onChangeText={onChangeTextProxy}
          keyboardAppearance={EStyleSheet.value('$keyboardAppearance')}
          {...(Platform.OS !== 'web' ? { autoCompleteType } : {})}
          {...rest}
        />

        {error ? (
          // @ts-ignore
          <AnimatedView
            style={{
              opacity: errorValue,
              transform: [
                { translateY: errorValue.interpolate([0, 1], [-3, 0]) },
              ],
            }}
          >
            {typeof error === 'string' ? (
              <Text style={[styles.error, errorStyle]}>{info}</Text>
            ) : (
              Object.values(error).map((each) => (
                <Text style={[styles.error, errorStyle]} key={each}>
                  {each}
                </Text>
              ))
            )}
          </AnimatedView>
        ) : info ? (
          <Text style={[styles.info, infoStyle]}>
            {info}
            {'\n'}
          </Text>
        ) : null}
      </View>
    );
  },
);

FloatingLabelInput.defaultProps = {
  underlineColorAndroid: 'transparent',
};

const styles = EStyleSheet.create({
  container: {
    margin: '$gridSmall',
  },

  label: {
    fontSize: 10,
    color: '$orange',
  },

  input: {
    color: '$inputTextColor',
    backgroundColor: '$inputBgColor',
    paddingHorizontal: '$gridSmallest',
    paddingVertical: '$gridSmallest / 2',
    borderBottomWidth: EStyleSheet.hairlineWidth,
    borderBottomColor: '$inputBorderColor',
    minWidth: 200,
  },

  inputErrorBorder: {
    borderBottomColor: '$danger',
  },

  error: {
    color: '$danger',
    paddingTop: () => EStyleSheet.value('$gridSmallest') / 2 - 1,
    paddingBottom: '$gridSmallest / 2',
    paddingHorizontal: '$gridSmallest',
  },

  info: {
    color: '$textColorFaded',
    paddingTop: () => EStyleSheet.value('$gridSmallest') / 2 - 1,
    paddingBottom: '$gridSmallest / 2',
    paddingHorizontal: '$gridSmallest',
  },
});

export default React.memo(FloatingLabelInput);
