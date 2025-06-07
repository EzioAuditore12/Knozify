import { SubmitButton, TextField } from "@/components/form";
import { fieldContext, formContext } from "@/contexts/tanstackFormContext";
import { createFormHook } from "@tanstack/react-form";

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
