import { useEffect } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';
import { config, useSpring } from 'react-spring/native';

/**
 * Listen to keyboard show/hide event and returns animated height value
 */
const useKeyboard = () => {
  const [{ height }, runAnimation] = useSpring(() => ({
    height: 0,
    config: config.stiff,
  }));

  const show = (event: KeyboardEvent) => {
    runAnimation({ height: event.endCoordinates.height });
  };

  const hide = () => {
    runAnimation({ height: 0 });
  };

  useEffect(() => {
    const keyboardShowSub = Keyboard.addListener('keyboardDidShow', show);
    const keyboardHideSub = Keyboard.addListener('keyboardDidHide', hide);
    return () => {
      keyboardShowSub.remove();
      keyboardHideSub.remove();
    };
  }, []);

  return height;
};

export default useKeyboard;
