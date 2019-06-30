import { Theme } from '../types';
import { fade } from './helper';

const defaults: Theme = {};
// Brand
defaults.$primary = '#4883f2';
defaults.$secondary = '#506182';
defaults.$tertiary = '#f37f72';

// Feedback
defaults.$info = '#5fa4f6';
defaults.$infoFaded = fade(defaults.$info);
defaults.$success = '#6dcf70';
defaults.$successFaded = fade(defaults.$success);
defaults.$warning = '#f6c842';
defaults.$warningFaded = fade(defaults.$warning);
defaults.$danger = '#fd6151';
defaults.$dangerFaded = fade(defaults.$danger);

// Grays
defaults.$white = '#ffffff';
defaults.$grayLighest = '#f1f3f6';
defaults.$grayLighter = '#e2e7ec';
defaults.$grayLight = '#d0d8e1';
defaults.$grayDark = '#a3aeb8';
defaults.$grayDarker = '#6d7883';
defaults.$grayDarkest = '#2a2c30';
defaults.$black = '#202327';

// Others
defaults.$blue = '#5272da';
defaults.$violet = '#847ae6';
defaults.$orange = '#fb8e3b';
defaults.$cyan = '#48cbb7';

// Grid
defaults.$grid = 24;
defaults.$gridSmall = 18;
defaults.$gridSmaller = 12;
defaults.$gridSmallest = 6;
defaults.$gridLarge = 36;
defaults.$gridLarger = 42;
defaults.$gridLargest = 48;

defaults.$borderRadius = 6;

// Make every prop required
export default defaults as Required<Theme>;
