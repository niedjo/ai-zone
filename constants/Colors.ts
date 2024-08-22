/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  primary: "#161622",
    secondary: {
      DEFAULT: "#FF9C01",
      100: "#FF9001",
      200: "#FF8E01",
    },
    black: {
      DEFAULT: "#000",
      100: "#1E1E2D",
      200: "#232533",
    },
    gray: {
      100: "#CDCDE0",
    },
    fontFamily: {
      pthin: ["Poppins-Thin", "sans-serif"],
      pextralight: ["Poppins-ExtraLight", "sans-serif"],
      plight: ["Poppins-Light", "sans-serif"],
      pregular: ["Poppins-Regular", "sans-serif"],
      pmedium: ["Poppins-Medium", "sans-serif"],
      psemibold: ["Poppins-SemiBold", "sans-serif"],
      pbold: ["Poppins-Bold", "sans-serif"],
      pextrabold: ["Poppins-ExtraBold", "sans-serif"],
      pblack: ["Poppins-Black", "sans-serif"],
    },
};
