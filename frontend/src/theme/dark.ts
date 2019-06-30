import { Theme } from '../types';
import defaults from './defaults';
import { darken, fade } from './helper';

const theme: Theme = { ...defaults };

// Theme name
theme.$theme = 'dark';

// Body
theme.$bgColor = defaults.$grayDarkest;
theme.$textColor = defaults.$white;
theme.$textColorFaded = fade(theme.$textColor);

// Header
theme.$headerBgColor = defaults.$black;
theme.$headerBorderColor = darken(theme.$headerBgColor);
theme.$headerTextColor = defaults.$white;
theme.$headerTextColorFaded = fade(theme.$headerTextColor);

// Input
theme.$inputBgColor = 'transparent';
theme.$inputBorderColor = defaults.$orange;
theme.$inputTextColor = theme.$textColor;
theme.$inputTextColorFaded = fade(theme.$inputTextColor);
theme.$keyboardAppearance = 'dark';

// Make every prop required
export default theme as Required<Theme>;
