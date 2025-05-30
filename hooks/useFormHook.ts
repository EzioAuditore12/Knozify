import { createFormHook } from "@tanstack/react-form";
import { fieldContext,formContext } from "@/contexts/formHookContexts";
import { TextField,CheckBoxField,SubmitButton,PhoneInputField,DateField } from "@/components/form";


export const {useAppForm}=createFormHook({
    fieldComponents:{
        TextField,
        CheckBoxField,
        PhoneInputField,
        DateField
    },
    formComponents:{
        SubmitButton
    },
    fieldContext,formContext
})