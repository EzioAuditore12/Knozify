import { H1, Muted, Text } from "@/components/ui";
import { Container } from "@/components/ui/layout";
import { AuthLayout } from "@/modules/auth/layout/authLayout";
import {
	LoginForm,
	SocialProviderLogin,
} from "@/modules/auth/login/components";
import { router } from "expo-router";

export default function Login() {
	return (
		<AuthLayout>
			<Container centered padded className="w-full gap-y-7">
				<H1 className="text-gray-800 dark:text-white">Welcome Back !</H1>
				<SocialProviderLogin />
				<Muted className="text-lg">Or login with</Muted>
				<LoginForm />
				<Muted className="text-lg"
				onPress={()=>{
					router.push("/login/forgot-password")
				}}
				>Forgot Password ?</Muted>
				<Muted className="text-lg">
					Don't have an account <Text className="text-purple-800">Sign Up</Text>
				</Muted>
			</Container>
		</AuthLayout>
	);
}
