// TODO : Need to improve the topography logic and fiix it
import { Text as RNText, TextProps } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/tailwind-cn'
import { forwardRef, ComponentPropsWithRef } from 'react'

const typographyVariants=cva(
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

type RNTextProps = ComponentPropsWithRef<typeof RNText> & VariantProps<typeof typographyVariants>

export const Typography = forwardRef<RNText, RNTextProps>((
    { intent, size, className,children, ...props }, ref) => {
    return (
        <RNText
            ref={ref}
            className={cn(typographyVariants({ intent, size }), className)}
            {...props}
        >
            {children}
        </RNText>
    )
})

Typography.displayName = "Typography";