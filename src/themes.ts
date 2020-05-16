import { registerThemes } from 'react-native-themed-styles';
import { useColorScheme } from 'react-native-appearance';

const light = {
  backgroundColor: 'white',
  textColor: 'black',
  border: '#ededed',
};
const dark = {
  backgroundColor: 'black',
  textColor: 'white',
  border: 'rgba(255, 255, 255, .2)',
};

const styleSheetFactory = registerThemes({ light, dark }, () => {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  return ['light', 'dark'].includes(colorScheme) ? colorScheme : 'light';
});

export { styleSheetFactory };
