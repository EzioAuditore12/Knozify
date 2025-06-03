import { cn } from "@/lib/utils";
import { type RefObject } from "react";
import { TextInput, type TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
	className?: string;
	ref?: RefObject<TextInput>;
}

function Input({ className, ...props }: InputProps) {
	return (
		<TextInput
			className={cn(
				"flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg leading-[1.25] text-foreground file:border-0 file:bg-transparent file:font-medium",
				props.editable === false && "opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

export { Input, type InputProps };
