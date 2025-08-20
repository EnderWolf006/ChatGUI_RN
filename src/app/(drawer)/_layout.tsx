import { Avatar, Button, Icon, Input, Text, useTheme } from '@rneui/themed';
import { Drawer } from 'expo-router/drawer';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DRAWER_GLOBAL_HORIZONTAL_PADDING = 12;

function DrawerContent() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.white, paddingTop: insets.top, }}>
      {/* Header: Search bar * Setting Button */}
      <View style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center', paddingHorizontal: DRAWER_GLOBAL_HORIZONTAL_PADDING, gap: DRAWER_GLOBAL_HORIZONTAL_PADDING + 1 }}>
        <Input containerStyle={{ flex: 1, paddingHorizontal: 0 }} renderErrorMessage={false} leftIcon={<Icon name="search"></Icon>} />
        <Button
          buttonStyle={{ paddingVertical: 0, paddingHorizontal: 0, height: 38, width: 38, overflow: 'visible' }}
          radius={19}
          type='clear'
          onPress={() => {
            console.log(11);
          }}
        >
          <Icon
            name='settings-outline'
            type="ionicon" />
        </Button>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 66,
          gap: 8,
        }}
      >
        {/* Fixed action buttons */}
        {[0, 0, 0].map((v, i) => {
          return (
            <Button
              key={i}
              buttonStyle={{ justifyContent: 'flex-start', paddingHorizontal: DRAWER_GLOBAL_HORIZONTAL_PADDING }}
              titleStyle={{ fontWeight: '600' }}
              icon={<Icon name='add' containerStyle={{ marginRight: DRAWER_GLOBAL_HORIZONTAL_PADDING }} />}
              type="clear"
            >
              {`ActionButton ${i + 1}`}
            </Button>
          )
        })}

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
          size={36}
          rounded
          icon={{ name: "pencil", type: "font-awesome" }}
          containerStyle={{ backgroundColor: "#9700b9" }}
        />
        <Text style={{
          fontSize: 22,
          fontWeight: '700',
        }}>Guest User</Text>
      </Button>

    </View>
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
      <Drawer.Screen name="index" />
    </Drawer>
  );
}
