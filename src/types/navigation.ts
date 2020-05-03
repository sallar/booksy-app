import {Options} from 'react-native-navigation';

export interface NavigationComponentOptions<P> {
  options?: (passProps?: P) => Options;
}

export type NavigationComponent<P = {}> = React.FunctionComponent<
  P & {
    componentId: string;
  }
> &
  NavigationComponentOptions<P>;
