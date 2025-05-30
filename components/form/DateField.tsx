import { useFieldContext } from "@/contexts/formHookContexts";
import { cn } from "@/utils/tailwind-cn";
import { DateInput,DateInputProps} from "../ui";
import { View } from "react-native";
import { FieldError } from "./FieldErros";

// TODO: Need to improve date formatting in this reusable component

export const DateField=({
    className,
    ...inputProps
}:DateInputProps)=>{
    const field = useFieldContext<string | null>()

    return(
        <View className="space-y-1">
            <DateInput
            className={cn(className)}
            id={field.name}
            value={field.state.value}
            onDateChange={date => field.handleChange(date?.toISOString().split('T')[0] || null)}
            onBlur={field.handleBlur}
            {...inputProps}
            />
            <FieldError meta={field.state.meta}/> 
        </View>
    )
}