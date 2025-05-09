import { createFormHook } from "@tanstack/react-form";
import { fieldContext,formContext } from "@/contexts/formHookContexts";
import { TextField,CheckBoxField,SubmitButton } from "@/components/form";


export const {useAppForm}=createFormHook({
    fieldComponents:{
        TextField,
        CheckBoxField,
    },
    formComponents:{
        SubmitButton
    },
    fieldContext,formContext
})