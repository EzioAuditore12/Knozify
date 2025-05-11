import { useStore } from "@tanstack/react-form";
import { useFormContext } from "@/contexts/formHookContexts";
import { Button,Text } from "../ui";
import { TouchableOpacityProps } from "react-native";
import { cn } from "@/utils/tailwind-cn";

type SubmitButtonProps={
    title:String
} & TouchableOpacityProps

export const SubmitButton=({
    title,
    className,
    ...props
}:SubmitButtonProps)=>{
    const form = useFormContext()

    const [isSubmitting,canSubmit]=useStore(form.store,(state)=>[
        state.isSubmitting,
        state.canSubmit
    ])

    return(
        <Button
        className={cn(className)}
        onPress={()=>{
            form.handleSubmit()
        }}
        disabled={isSubmitting || !canSubmit}
        {...props}
        >
            <Text className="text-white">
                {title}
            </Text>
        </Button>
    )

}