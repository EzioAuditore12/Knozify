import { Stack } from "@/components/ui/layout";
import { GoogleIcon,FacebookIcon } from "../icons";
import { SocialProviderButton } from "../../components/socialProviderButton";

export function SocialProviderLogin() {
	return(
		<Stack className="w-full items-center" verticalSpacing={"md"}>
			{/* Google Provider */}
			<SocialProviderButton
			providerIcon={GoogleIcon}
			className="bg-white w-full"
			textColor="black"
			providerName="Google"
			/>
			{/* Facebook Provider */}
			<SocialProviderButton
			providerIcon={FacebookIcon}
			className="bg-blue-600 w-full"
			textColor="white"
			providerName="Facebook"
			/>
		</Stack>
	)
}
