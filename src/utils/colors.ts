import {
  Appearance,
  ColorValue,
  DynamicColorIOS,
  Platform,
} from 'react-native';

export const DynamicColor = (
  light: ColorValue,
  dark: ColorValue,
): ColorValue => {
  if (Platform.OS === 'ios') {
    return DynamicColorIOS({ light, dark });
  }
  return Appearance.getColorScheme() === 'dark' ? dark : light;
};

const Colors = {
  label: DynamicColor('#000000', '#ffffff'),
  accent: 'rgb(255, 45, 85)',
  card: DynamicColor('#ffffff', '#121212'),
  background: DynamicColor('rgb(242, 242, 242)', '#000000'),
  separator: DynamicColor('rgba(60,60,67,0.298)', 'rgba(84,84,89,0.6)'),
};

export default Colors as Record<keyof typeof Colors, ColorValue>;
