import { useFieldContext } from "@/contexts/formHookContexts";
import { Text as Label , Input} from "../ui";
import { TextInputProps, View } from "react-native";
import { FieldError } from "./FieldErros";

type TextFieldProps={
    labelName:string
    labelClassName?:string
} & TextInputProps

export const TextField=({
    labelName,
    labelClassName,
    ...inputProps
}:TextFieldProps)=>{
    const field = useFieldContext<string>()

    return(
        <View className="space-y-1">
            <Label>{labelName}</Label>
            <Input
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