import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import {cva, type VariantProps} from 'class-variance-authority'
import { cn } from "@/utils/tailwind-cn";
import { ElementRef, forwardRef } from "react";

const buttonVariant=cva(
    "inline-flex items-center justify-center rounded-md",
    {
        variants:{
            intent:{
                primary:"bg-blue-500",
                secondary:"bg-gray-300",
                destructive:"bg-red-500"
            },
            size:{
                sm:"p-2 px-3",
                md:"p-3 px-4",
                lg:"p-4 px-5"
            }
        },
        defaultVariants:{
            intent:"primary",
            size:"md"
        }
    }
)

interface ButtonProps
    extends TouchableOpacityProps,VariantProps<typeof buttonVariant> {};

export const Button= forwardRef<ElementRef<typeof TouchableOpacity>,ButtonProps>((
    { intent, size, className,children, ...props }, ref)=>{
        return(
            <TouchableOpacity
            ref={ref}
            className={cn(buttonVariant({intent,size}),className)}
            {...props}
            >
                {children}
            </TouchableOpacity>
        )
    })