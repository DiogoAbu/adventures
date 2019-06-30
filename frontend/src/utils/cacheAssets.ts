import { Image } from 'react-native';

import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

export function cacheImages(images: any[]): Array<Promise<void>> {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export function cacheFonts(fonts: any[]): Array<Promise<void>> {
  return fonts.map((font) => Font.loadAsync(font));
}
