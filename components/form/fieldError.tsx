import { AnyFieldMeta } from "@tanstack/react-form";
import { TextProps } from "react-native";
import { ZodError } from "zod";
import { Text } from "../ui";

type FieldErrorProps = {
	meta: AnyFieldMeta;
} & TextProps;

export const FieldError = ({ meta, className, ...props }: FieldErrorProps) => {
	if (!meta.isTouched) {
		return null;
	}
	return meta.errors.map(({ message }: ZodError, index) => (
		<Text key={index} className="text-red-500" {...props}>
			{message}
		</Text>
	));
};
