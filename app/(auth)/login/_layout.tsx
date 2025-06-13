import { Stack } from "expo-router";

export default function LoginAuthLayout() {
	return (
		<Stack initialRouteName="index">
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="forgot-password" />
			<Stack.Screen name="reset-password" />
		</Stack>
	);
}
