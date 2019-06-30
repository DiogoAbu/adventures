import { findNodeHandle, ScrollView, TextInput } from 'react-native';

/**
 * Use SrollView method to scroll component into view
 */
export default function scrollToView(
  ref: React.RefObject<any>,
  scrollRef: React.RefObject<ScrollView>,
  animated?: boolean,
) {
  if (scrollRef && scrollRef.current) {
    requestAnimationFrame(() => {
      ref.current!.measureLayout(
        findNodeHandle(scrollRef.current)!,
        (_: number, y: number) => {
          scrollRef.current!.scrollTo({
            x: 0,
            y,
            animated: animated === false ? false : true,
          });
        },
        () => null,
      );
    });
  }
}

export function focusNext(
  ref: React.RefObject<TextInput>,
  scrollRef: React.RefObject<ScrollView>,
  animated?: boolean,
) {
  return () => {
    if (ref && ref.current) {
      scrollToView(ref, scrollRef, animated);
      return ref.current.focus();
    }
  };
}
