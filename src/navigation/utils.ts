import {
  Layout,
  Navigation as RNNavigation,
  Options,
} from 'react-native-navigation';

type NavigationProps<P> = {
  name: string;
  passProps?: P;
  options?: Options;
};

export function setLayoutChildren<P>(props: NavigationProps<P>): Layout<P> {
  return {
    component: { ...props },
  };
}

export function setLayoutStackChildren<P>(
  props: NavigationProps<P>,
  options?: Options,
): Layout {
  return {
    stack: { children: [setLayoutChildren(props)], options },
  };
}

const constants = RNNavigation.constants();
export const Navigation = {
  setRoot<R>(props: NavigationProps<R>) {
    return RNNavigation.setRoot({ root: setLayoutStackChildren(props) });
  },
  setStackRoot<R>(toId: string, props: NavigationProps<R>) {
    return RNNavigation.setStackRoot(toId, setLayoutChildren(props));
  },
  push<R>(toId: string, props: NavigationProps<R>) {
    return RNNavigation.push(toId, setLayoutChildren(props));
  },
  pop(currentId: string, options?: Options) {
    return RNNavigation.pop(currentId, options);
  },
  popTo(toId: string, options?: Options) {
    return RNNavigation.popTo(toId, options);
  },
  popToRoot(currentId: string, options?: Options) {
    return RNNavigation.popToRoot(currentId, options);
  },
  showModal<P>(props: NavigationProps<P>) {
    return RNNavigation.showModal(setLayoutStackChildren(props));
  },
  dismissModal(currentId: string, options?: Options) {
    return RNNavigation.dismissModal(currentId, options);
  },
  dismissAllModals: RNNavigation.dismissAllModals,
  showOverlay<P>(props: NavigationProps<P>) {
    return RNNavigation.showOverlay(setLayoutChildren(props));
  },
  dismissOverlay(currentId: string) {
    return RNNavigation.dismissOverlay(currentId);
  },
  updateProps<P extends object>(currentId: string, props: P) {
    return RNNavigation.updateProps(currentId, props);
  },
  events() {
    return RNNavigation.events();
  },
  setDefaultOptions(options: Options) {
    return RNNavigation.setDefaultOptions(options);
  },
  mergeOptions(currentId: string, options: Options) {
    return RNNavigation.mergeOptions(currentId, options);
  },
  constants,
};
