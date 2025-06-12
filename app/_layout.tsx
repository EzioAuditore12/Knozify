import "@/global.css";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";
import {
	DarkTheme,
	DefaultTheme,
	Theme,
	ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";

const LIGHT_THEME: Theme = {
	...DefaultTheme,
	colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
	...DarkTheme,
	colors: NAV_THEME.dark,
};

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
	const { isDarkColorScheme } = useColorScheme();

	return (
		<KeyboardProvider>
			<ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
				<StatusBar style={isDarkColorScheme ? "light" : "dark"} />
				<Stack initialRouteName="(app)">
					<Stack.Screen
						name="(app)"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="(auth)"
						options={{
							headerShown: false,
						}}
					/>
				</Stack>
				<PortalHost />
			</ThemeProvider>
		</KeyboardProvider>
	);
}
