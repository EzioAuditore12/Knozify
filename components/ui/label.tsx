import { cn } from "@/lib/utils";
import { Root, Text, type TextProps, type TextRef } from "@rn-primitives/label";
import { type RefObject } from "react";

interface LabelProps extends TextProps {
	ref?: RefObject<TextRef>;
}

function Label({
	className,
	onPress,
	onLongPress,
	onPressIn,
	onPressOut,
	...props
}: LabelProps) {
	return (
		<Root
			className="web:cursor-default"
			onPress={onPress}
			onLongPress={onLongPress}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
		>
			<Text
				className={cn(
					"text-sm text-foreground native:text-base font-medium leading-none web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70",
					className,
				)}
				{...props}
			/>
		</Root>
	);
}

export { Label };
export { type LabelProps };
