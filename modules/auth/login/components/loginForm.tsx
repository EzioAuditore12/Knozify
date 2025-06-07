import { Stack } from "@/components/ui/layout/stack";

import { Text } from "@/components/ui";
//schema and type
import { loginUserObject, loginUserSchema } from "../schemas/loginSchema";

//form hook
import { useAppForm } from "@/lib/useAppForm";

export function LoginForm() {
	const loginForm = useAppForm({
		defaultValues: loginUserObject,
		validators: {
			onChange: loginUserSchema,
		},
		onSubmit: ({ value }) => {
			console.log(value);
		},
	});
	return (
		<Stack className="w-full items-center">
			<loginForm.AppField name="username">
				{(field) => (
					<field.TextField
						className="max-w-[400px] rounded-xl"
						placeholder="Username"
					/>
				)}
			</loginForm.AppField>

			<loginForm.AppField name="password">
				{(field) => (
					<field.TextField
						className="max-w-[400px] rounded-xl"
						placeholder="Password"
						secureTextEntry
					/>
				)}
			</loginForm.AppField>

			<loginForm.AppForm>
				<loginForm.SubmitButton className="bg-teal-600 dark:bg-green-600 rounded-3xl w-full max-w-[400px]">
					<Text className="text-lg font-semibold dark:text-white">Login</Text>
				</loginForm.SubmitButton>
			</loginForm.AppForm>
		</Stack>
	);
}
