import { Button, Input, Text } from "@/components/ui";
import { Stack } from "@/components/ui/layout/stack";
import { useState } from "react";

export function LoginForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = () => {
		console.log({ username, password });
	};

	return (
		<Stack className="w-full items-center gap-y-4">
			<Input
				className="max-w-[400px] rounded-xl"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.nativeEvent.text)}
			/>

			<Input
				className="max-w-[400px] rounded-xl"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.nativeEvent.text)}
				secureTextEntry
			/>

			<Button
				className="bg-teal-600 dark:bg-green-600 rounded-3xl w-full max-w-[400px]"
				onPress={handleSubmit}
			>
				<Text className="text-lg font-semibold dark:text-white">Login</Text>
			</Button>
		</Stack>
	);
}
