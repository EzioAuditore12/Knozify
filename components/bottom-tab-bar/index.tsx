import { BottomTabBarProps } from '@react-navigation/bottom-tabs'; 
import { PlatformPressable, Text } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

export default function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const insets = useSafeAreaInsets();
  return (
    <View 
    className='flex-row p-2 border-t-2 dark:bg-gray-800'
    style={{
      paddingBottom: insets.bottom,           
      height: 60 + insets.bottom,             
    }}
    > 
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true, params: route.params });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tabBarIcon = options.tabBarIcon;
        const iconColor = isFocused ? colors.primary : colors.text;

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityRole="button" 
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            android_ripple={{color:'transparent'}}
            className="flex-1 justify-center items-center" 
          >
            {tabBarIcon && tabBarIcon({ focused: isFocused, color: iconColor, size: 24 })} 
            <Text style={{ color: iconColor, marginTop: tabBarIcon ? 4 : 0 }}>
              {typeof label === 'string' ? label : route.name }
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}