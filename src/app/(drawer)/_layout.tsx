import { t } from '@/i18n';
import { Lucide } from '@react-native-vector-icons/lucide';
import { useDrawerStatus } from '@react-navigation/drawer';
import { Avatar, Button, Icon, Input, Text, useTheme } from '@rneui/themed';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import { Keyboard, ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const DRAWER_GLOBAL_HORIZONTAL_PADDING = 16;

function DrawerContent() {
  const insets = useSafeAreaInsets();
  const drawerStatus = useDrawerStatus?.();
  const { theme } = useTheme();

  const ACTION_BUTTONS = [
    {
      title: t('drawer.actionbutton.new_chat'),
      icon: <Lucide name='square-pen' size={22} color={theme.colors.grey5} />,
    },
    {
      title: t('drawer.actionbutton.assistant'),
      icon: <Icon name='dependabot' type='octicon' color={theme.colors.grey5} size={22} />,
    },
  ]

  // Close drawer when drawerStatus changes 
  useEffect(() => {
    Keyboard.dismiss();
  }, [drawerStatus]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.white, paddingTop: insets.top, }}>
      {/* Header: Search bar & Setting Button */}
      <View style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center', paddingHorizontal: DRAWER_GLOBAL_HORIZONTAL_PADDING, gap: DRAWER_GLOBAL_HORIZONTAL_PADDING + 1 }}>
        <Input
          placeholder={t('drawer.search.placeholder')}
          leftIconContainerStyle={{ paddingRight: 6 }}
          containerStyle={{ flex: 1, paddingHorizontal: 0 }}
          leftIcon={<Icon name="search" type="octicon"></Icon>}
        />
        <Button
          buttonStyle={{ paddingVertical: 0, paddingHorizontal: 0, height: 38, width: 38 }}
          radius={19}
          type='clear'
          onPress={() => {
            console.log(11);
          }}
        >
          <Lucide name='square-pen' size={24} color={theme.colors.black} />
        </Button>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode='on-drag'
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 66,
        }}
      >
        {/* Fixed action buttons */}
        {ACTION_BUTTONS.map((v, i) => {
          return (
            <Button
              key={i}
              buttonStyle={{ justifyContent: 'flex-start', paddingHorizontal: DRAWER_GLOBAL_HORIZONTAL_PADDING }}
              titleStyle={{ fontWeight: '600', marginLeft: DRAWER_GLOBAL_HORIZONTAL_PADDING }}
              icon={v.icon}
              type="clear"
            >
              {v.title}
            </Button>
          )
        })}

        {/* Divider */}
        <View style={{ height: 12 }}></View>

        {/* History List */}
        {new Array(16).fill(0).map((v, i) => {
          return (
            <Button
              key={i}
              buttonStyle={{ justifyContent: 'flex-start', paddingHorizontal: DRAWER_GLOBAL_HORIZONTAL_PADDING }}
              titleStyle={{ fontWeight: '600' }}
              type="clear"
            >
              {`History ${i + 1}`}
            </Button>
          )
        })}
      </ScrollView>

      {/* Footer: User Card */}

      <Button
        containerStyle={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
        }}
        buttonStyle={{
          paddingTop: Math.min(insets.bottom + 16, 22),
          paddingBottom: Math.min(insets.bottom + 16, 50),
          paddingHorizontal: DRAWER_GLOBAL_HORIZONTAL_PADDING,
          backgroundColor: theme.colors.white + 'f5',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: DRAWER_GLOBAL_HORIZONTAL_PADDING,
        }}>
        <Avatar
          size={34}
          rounded
          icon={{ name: "pencil", type: "font-awesome" }}
          containerStyle={{ backgroundColor: "#9700b9" }}
        />
        <Text style={{
          fontSize: 21,
          fontWeight: '700',
        }}>Guest User</Text>
      </Button>

    </View >
  );
}

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
        headerTitleStyle: {
          color: theme.colors.black,
        },
        headerStyle: {
          backgroundColor: theme.colors.white,
        },
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
