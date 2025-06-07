import { useFormContext } from "@/contexts/tanstackFormContext";
import { cn } from "@/lib/utils";
import { useStore } from "@tanstack/react-form";
import { Button, type ButtonProps } from "../ui";

export const SubmitButton = ({
	className,
	children,
	...props
}: ButtonProps) => {
	const form = useFormContext();

	const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
		state.isSubmitting,
		state.canSubmit,
	]);

	return (
		<Button
			className={cn(className)}
			onPress={() => {
				form.handleSubmit();
			}}
			disabled={isSubmitting || !canSubmit}
			{...props}
		>
			{children}
		</Button>
	);
};
