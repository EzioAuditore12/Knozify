import { Button, ButtonProps, Text } from "@/components/ui";
import type { CustomIconProps } from "@/lib/icons/iconWithClassName";
import { cn } from "@/lib/utils";
import { ComponentType } from "react";

type SocialProviderButtonProps = {
	providerIcon: ComponentType<CustomIconProps>;
	providerName: string;
	iconSize?: number;
} & ButtonProps;

export function SocialProviderButton({
	className,
	providerIcon: ProviderIcon,
	providerName,
	iconSize,
	...buttonProps
}: SocialProviderButtonProps) {
	return (
		<Button
			className={cn("flex-row w-full justify-around max-w-[300px] ", className)}
			{...buttonProps}
		>
			<ProviderIcon size={iconSize} />
			<Text>Sign In With {providerName}</Text>
		</Button>
	);
}
