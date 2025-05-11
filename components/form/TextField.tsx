import { useFieldContext } from "@/contexts/formHookContexts";
import { cn } from "@/utils/tailwind-cn";
import { Text as Label , Input} from "../ui";
import { TextInputProps, View } from "react-native";
import { FieldError } from "./FieldErros";

export const TextField=({
    className,
    ...inputProps
}:TextInputProps)=>{
    const field = useFieldContext<string>()

    return(
        <View className="space-y-1">
            <Input
            className={cn(className)}
            id={field.name}
            value={field.state.value}
            onChange={e => field.handleChange(e.nativeEvent.text)}
            onBlur={field.handleBlur}
            {...inputProps}
            />
            <FieldError meta={field.state.meta}/> 
        </View>
    )
}