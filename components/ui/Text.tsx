import { Text as RNText, TextProps } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/tailwind-cn'
import { forwardRef, ComponentPropsWithRef } from 'react'

const textVariants=cva(
    "font-medium",
    {
        variants:{
            intent:{
                primary: "text-black dark:text-white",
                secondary: "text-gray-300",
                destructive: "text-red-500"
            },
            size:{
                base: "text-base",
                xs: "text-xs",
                sm: "text-sm",
                lg: "text-lg",
                xl: "text-xl"
            },
        },
        defaultVariants:{
            intent: "primary",
            size: "base"
        }
    }
)

type RNTextProps = ComponentPropsWithRef<typeof RNText> & VariantProps<typeof textVariants>

export const Text = forwardRef<RNText, RNTextProps>((
    { intent, size, className,children, ...props }, ref) => {
    return (
        <RNText
            ref={ref}
            className={cn(textVariants({ intent, size }), className)}
            {...props}
        >
            {children}
        </RNText>
    )
})

Text.displayName = "Text";