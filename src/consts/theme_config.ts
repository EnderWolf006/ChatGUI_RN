import { createTheme } from "@rneui/themed";
import { Keyboard, Platform, TouchableNativeFeedback } from 'react-native';

export const themeConfig = createTheme({
  lightColors: {
    primary: "#2563eb",
    background: '#F3F3F3',
  },
  darkColors: {
    primary: "#3b82f6",
    background: '#262626',
  },
  components: {
    Text: (props, theme) => ({
      style: {
        color: theme.colors.black,
        fontSize: 16,
      },
    }),
    Button: (props, theme) => {
      const radius = (props?.radius as any) ?? 0;
      // inject onPress to dismiss keyboard by default
      if (props?.onPress) {
        const userOnPress = props.onPress;
        props.onPress = (...args) => {
          userOnPress(...args) 
          Keyboard.dismiss();
        }
      }
      return {
        radius,
        color: 'rgba(0, 0, 0, 0)',
        titleStyle: { color: theme.colors.black },
        delayPressIn: 50,
        pressRetentionOffset: { top: 4, left: 4, bottom: 4, right: 4 },
        buttonStyle: [
          {
            borderRadius: radius,
            paddingVertical: 14,
          },
          props?.buttonStyle as any],
        ...(Platform.OS === 'android'
          ? {
            background: TouchableNativeFeedback.Ripple('rgba(128,128,128,0.2)', false),
            containerStyle: [
              { borderRadius: radius, overflow: 'hidden' },
              props?.containerStyle as any,
            ],

          }
          : {
            containerStyle: [props?.containerStyle as any],
          }),
      };
    },
    Icon: (props, theme) => ({
      color: theme.colors.black,
      size: 24,
    }),
    Input: (props, theme) => ({
      renderErrorMessage: false,
      inputContainerStyle: {
        height: 44,
        borderRadius: 22,
        backgroundColor: theme.colors.background,
        borderBottomWidth: 0,
        paddingHorizontal: 10,
        margin: 0,
      },
      inputStyle: {
        color: theme.colors.black,
        fontSize: 16,
      },
    })
  }
});