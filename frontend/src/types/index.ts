interface ThemeDefaults {
  // Defaults
  $primary: string | number;
  $secondary: string | number;
  $tertiary: string | number;

  $info: string | number;
  $infoFaded: string | number;
  $success: string | number;
  $successFaded: string | number;
  $warning: string | number;
  $warningFaded: string | number;
  $danger: string | number;
  $dangerFaded: string | number;

  $white: string | number;
  $grayLighest: string | number;
  $grayLighter: string | number;
  $grayLight: string | number;
  $grayDark: string | number;
  $grayDarker: string | number;
  $grayDarkest: string | number;
  $black: string | number;

  $blue: string | number;
  $violet: string | number;
  $orange: string | number;
  $cyan: string | number;

  $grid: string | number;
  $gridSmall: string | number;
  $gridSmaller: string | number;
  $gridSmallest: string | number;
  $gridLarge: string | number;
  $gridLarger: string | number;
  $gridLargest: string | number;

  $borderRadius: string | number;

  // Theme
  $theme: string | number;

  $bgColor: string | number;

  $headerBgColor: string | number;
  $headerBorderColor: string | number;
  $headerTextColor: string | number;
  $headerTextColorFaded: string | number;

  $textColor: string | number;
  $textColorFaded: string | number;

  $inputBgColor: string | number;
  $inputBorderColor: string | number;
  $inputTextColor: string | number;
  $inputTextColorFaded: string | number;
  $keyboardAppearance: string | number;
}

// Make every prop optional
export type Theme = Partial<ThemeDefaults>;
