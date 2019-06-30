import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import {
  Platform,
  StyleProp,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { RouteComponentProps, withRouter } from '../utils/router';

const { statusBarHeight } = Constants;

export interface Props {
  left?: any;
  center?: any;
  right?: any;
  leftStyle?: StyleProp<TextStyle>;
  centerStyle?: StyleProp<TextStyle>;
  rightStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  leftOnPress?: () => void;
  centerOnPress?: () => void;
  rightOnPress?: () => void;
  children?: ReactNode;
}

const Header: React.FC<RouteComponentProps<any> & Props> = ({
  left,
  center,
  right,
  leftStyle,
  centerStyle,
  rightStyle,
  contentContainerStyle,
  leftOnPress,
  centerOnPress,
  rightOnPress,
  children,
  history,
}) => {
  // @ts-ignore
  const [canGoBack, setCanGoBack] = useState(history.index > 0);

  useEffect(() => {
    // @ts-ignore
    setCanGoBack(history.index > 0);
    // @ts-ignore
  }, [history.index]);

  const leftOnPressDefault = () => {
    history.goBack();
  };

  const isValidChildren = React.isValidElement(children);

  const Element = isValidChildren ? View : Fragment;
  const elementProps = isValidChildren
    ? { style: [styles.contentContainer, contentContainerStyle] }
    : null;

  return (
    <Element {...elementProps}>
      <View style={styles.container}>
        {left !== false && (
          <TouchableWithoutFeedback
            onPress={leftOnPress || leftOnPressDefault}
            disabled={!canGoBack || !leftOnPress}
          >
            <View
              style={[styles.rightLeftContainer, { alignItems: 'flex-start' }]}
            >
              <Icon
                name={canGoBack ? 'chevron-left' : 'menu'}
                style={[styles.icon, canGoBack && styles.iconBack, leftStyle]}
              />
            </View>
          </TouchableWithoutFeedback>
        )}

        {center !== false && (
          <TouchableWithoutFeedback
            onPress={centerOnPress}
            disabled={!centerOnPress}
          >
            <View
              style={[
                styles.centerContainer,
                { alignItems: left === false ? 'flex-start' : 'center' },
                left === false && styles.titleNotCentered,
              ]}
            >
              {typeof center === 'string' ? (
                <Text style={[styles.title, centerStyle]}>{center}</Text>
              ) : React.isValidElement(center) ? (
                center
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        )}

        {right !== false && (
          <TouchableWithoutFeedback
            onPress={rightOnPress}
            disabled={!rightOnPress}
          >
            <View
              style={[styles.rightLeftContainer, { alignItems: 'flex-end' }]}
            >
              {typeof right === 'string' ? (
                <Icon name={right} style={[styles.icon, rightStyle]} />
              ) : React.isValidElement(right) ? (
                right
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>

      {isValidChildren && children}
    </Element>
  );
};

Header.defaultProps = {};

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '$headerBgColor',
    borderBottomColor: '$headerBorderColor',
    borderBottomWidth: EStyleSheet.hairlineWidth,
    paddingHorizontal: '$gridSmaller',
    paddingTop: statusBarHeight,
    height: Platform.select({ android: 56, default: 44 }) + statusBarHeight,
  },

  contentContainer: {
    flex: 1,
    backgroundColor: '$bgColor',
  },

  centerContainer: {
    flex: 3,
  },

  rightLeftContainer: {
    flex: 1,
  },

  icon: {
    color: '$headerTextColor',
    fontSize: 30,
    width: '$gridLarger',
    textAlign: 'center',
  },

  iconBack: {
    fontSize: 36,
    width: '$gridLarger',
  },

  title: {
    color: '$headerTextColor',
    fontSize: 18,
    fontWeight: '600',
  },

  titleNotCentered: {
    paddingHorizontal: '$gridSmallest',
  },
});

export default React.memo(withRouter(Header));
