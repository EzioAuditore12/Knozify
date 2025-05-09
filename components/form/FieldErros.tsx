import { cn } from "@/utils/tailwind-cn";
import { AnyFieldMeta } from "@tanstack/react-form";
import { TextProps } from "react-native";
import { Text } from "../ui";
import { ZodError } from "zod";

type FieldErrorProps={
    meta:AnyFieldMeta,
} & TextProps

export const FieldError=({
    meta,
    className,
    ...props
}:FieldErrorProps)=>{
    if(!meta.isTouched) {
        return null;
    }
    return meta.errors.map(({message}:ZodError,index)=>
        <Text
        key={index}
        intent={"destructive"}
        {...props}
        >
            {message}
        </Text>
        )
};