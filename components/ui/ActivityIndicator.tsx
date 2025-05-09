import { ActivityIndicator as NativeActivityIndicator,ActivityIndicatorProps as NativeActivityIndicatorProps } from "react-native";
import {cva, type VariantProps} from 'class-variance-authority'
import { cn } from "@/utils/tailwind-cn";
import { ElementRef, ForwardedRef, forwardRef } from "react";
import { cssInterop } from "nativewind";

cssInterop(NativeActivityIndicator,{
    className: {
        target: 'color',
        nativeStyleToProp: {
          fontSize: 'size',
          color: 'color',
        },
    },
})

const activityIndicatorVariants=cva(
    "",
    {
        variants:{
            intent:{
                primary:"text-blue-500",
                secondary:"text-gray-600",
                destructive:"text-red-500"
            },
            size:{
                sm:'text-sm',
                md:'text-md',
                lg:'text-lg',
                xl:'text-xl',
                xxl:'text-4xl',
                xxxl:'text-[80px]'
            }
        },
        defaultVariants:{
            intent:"primary",
            size:"xxl"
        }
    }
)

interface ActivityIndicatorProps extends
    Omit<NativeActivityIndicatorProps, 'size'>, VariantProps<typeof activityIndicatorVariants> {}

export const ActivityIndicator=forwardRef<ElementRef<typeof NativeActivityIndicator>,ActivityIndicatorProps>((
    {className,intent,size,...props},ref
)=>{
    return(
        <NativeActivityIndicator
        ref={ref}
        className={cn(activityIndicatorVariants({intent,size}),className)}
        {...props}
        />
    )
})

ActivityIndicator.displayName="ActivityIndicator"