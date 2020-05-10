import { registerThemes } from 'react-native-themed-styles';
import { useColorScheme } from 'react-native-appearance';

const light = { backgroundColor: 'white', textColor: 'black' };
const dark = { backgroundColor: 'black', textColor: 'white' };

const styleSheetFactory = registerThemes({ light, dark }, () => {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  return ['light', 'dark'].includes(colorScheme) ? colorScheme : 'light';
});

export { styleSheetFactory };
