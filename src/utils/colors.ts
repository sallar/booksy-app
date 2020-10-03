import { Platform, PlatformColor } from 'react-native';

const Colors = Platform.select({
  ios: {
    label: PlatformColor('label'),
    accent: PlatformColor('link'),
    card: PlatformColor('systemFill'),
  },
  android: {
    label: '#000',
    accent: '#147EFB',
    card: '#ffffff',
  },
  default: {
    label: '#000',
    accent: '#147EFB',
    card: '#ffffff',
  },
});

export default Colors;
