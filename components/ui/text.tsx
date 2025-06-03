import { cn } from "@/lib/utils";
import { Text as SlotText } from "@rn-primitives/slot";
import {
	type ComponentProps,
	type RefObject,
	createContext,
	useContext,
} from "react";
import { Text as RNText } from "react-native";

const TextClassContext = createContext<string | undefined>(undefined);

function Text({
	className,
	asChild = false,
	...props
}: ComponentProps<typeof RNText> & {
	ref?: RefObject<RNText>;
	asChild?: boolean;
}) {
	const textClass = useContext(TextClassContext);
	const Component = asChild ? SlotText : RNText;
	return (
		<Component
			className={cn(
				"text-base text-foreground web:select-text",
				textClass,
				className,
			)}
			{...props}
		/>
	);
}

export { Text, TextClassContext };
