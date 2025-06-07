import { Button, ButtonProps, Text } from "@/components/ui";
import type { CustomIconProps } from "@/lib/icons/iconWithClassName";
import { cn } from "@/lib/utils";
import { ComponentType } from "react";
import { TextStyle } from "react-native";

type SocialProviderButtonProps = {
	providerIcon: ComponentType<CustomIconProps>;
	providerName: string;
	iconSize?: number;
	textColor?: string;
	textStyle?: TextStyle;
} & ButtonProps;

export function SocialProviderButton({
	className,
	providerIcon: ProviderIcon,
	providerName,
	iconSize,
	textColor,
	...buttonProps
}: SocialProviderButtonProps) {
	return (
		<Button
			className={cn(
				"flex-row gap-x-2 rounded-2xl max-w-[400px]",
				"shadow-2xl",
				className
			)}
			{...buttonProps}
		>
			<ProviderIcon size={iconSize} />
			<Text style={{ color: textColor }}>Sign In With {providerName}</Text>
		</Button>
	);
}
