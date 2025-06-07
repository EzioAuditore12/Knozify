import { useFieldContext } from "@/contexts/tanstackFormContext";
import { cn } from "@/lib/utils";
import { View } from "react-native";
import { Input, InputProps, Text } from "../ui";
import { FieldError } from "./fieldError";

export const TextField = ({ className, ...inputProps }: InputProps) => {
	const field = useFieldContext<string>();
	const hasError = field.state.meta.errors.length > 0;

	return (
		<>
			<Input
				className={cn(className)}
				id={field.name}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.nativeEvent.text)}
				onBlur={field.handleBlur}
				{...inputProps}
			/>
			<Text className="min-h-[30px]">
				{" "}
				{/* Reserve space for error */}
				{hasError ? <FieldError meta={field.state.meta} /> : null}
			</Text>
		</>
	);
};
