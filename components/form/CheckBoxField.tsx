import { useFieldContext } from "@/contexts/formHookContexts";
import { FieldError } from "./FieldErros";
import { Text as Label,Checkbox } from "../ui";
import { View,TextProps } from "react-native";
import { CheckboxProps } from "expo-checkbox";

type CheckBoxFieldProps={
    label:string
    description?:string
} & TextProps & CheckboxProps

export const CheckBoxField=({
    label,
    description,
    className,
    ...props
}:CheckBoxFieldProps)=>{
    const field=useFieldContext<boolean>()

    return(
        <View className="space-y-2">
            <View className="flex-row items-center space-x-2">
            <Checkbox
            id={field.name}
            value={field.state.value}
            onValueChange={field.handleChange}
            {...props}
            />

                <View className="flex-row gap-1.5 leading-none">
                    <Label
                    className="ml-2"
                    >
                        {label}
                    </Label>
                </View>
                {description && (
                    <Label className="text-blue-500 text-sm">{description}</Label>
                )}
            </View>
            <FieldError meta={field.state.meta}/>
        </View>
    )
}