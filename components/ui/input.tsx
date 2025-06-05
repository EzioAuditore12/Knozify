import { cn } from "@/lib/utils";
import { type RefObject } from "react";
import { TextInput, type TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
    className?: string;
    ref?: RefObject<TextInput>;
}

function Input({ className, ...props }: InputProps) {
    return (
        <TextInput
            className={cn(
                "h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg text-foreground focus:border-ring", 
                props.editable === false && "opacity-50",
                className
            )}
            placeholderTextColor="rgba(156, 163, 175, 1)"
            textAlignVertical="center"
            {...props}
        />
    );
}

export { Input, type InputProps };
