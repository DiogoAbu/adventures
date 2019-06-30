import color from 'color';

export function fade(value: string | number): string | number {
  return color(value)
    .alpha(0.5)
    .string();
}

export function darken(value: string | number): string | number {
  return color(value)
    .darken(0.3)
    .string();
}
