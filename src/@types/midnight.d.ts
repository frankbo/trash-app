declare module "react-native-midnight" {
  type MidnightListener = () => void;
  export const useOnDayChange: (cb: MidnightListener) => void;
  const _default: {
    addListener: (
      cb: MidnightListener
    ) => import("react-native").EmitterSubscription;
  };
}
