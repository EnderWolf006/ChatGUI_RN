import { DrawerContent } from '@/comps/drawer/drawerContent';
import { useTheme } from '@rneui/themed';
import { Drawer } from 'expo-router/drawer';
import { useWindowDimensions } from 'react-native';


export default function Layout() {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  return (
    <Drawer
      screenOptions={{
        // Allow opening the drawer by swiping from anywhere on the screen
        swipeEnabled: true,
        swipeEdgeWidth: width,
        swipeMinDistance: 5,
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: theme.colors.white,
          width: width * 0.8,
        },
        drawerContentStyle: {
          backgroundColor: theme.colors.white,
        },
      }}
      drawerContent={DrawerContent}
    >
      <Drawer.Screen name="index" options={{
        headerShown: false,
      }} />
    </Drawer>
  );
}
