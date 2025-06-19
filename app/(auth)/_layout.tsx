import { Stack } from "expo-router";

export default function AuthLayout() {
	return (
		<Stack initialRouteName="register">
			<Stack.Screen name="register" />
		</Stack>
	);
}
