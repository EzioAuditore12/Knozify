import {Checkbox as ExpoCheckbox,CheckboxProps as ExpoCheckboxProps} from 'expo-checkbox'
import {cva, type VariantProps} from 'class-variance-authority'
import { cn } from '@/utils/tailwind-cn'
import { ElementRef, forwardRef, useState } from 'react'
import {cssInterop} from 'nativewind'

cssInterop(ExpoCheckbox,{
    className:{
        target:'style',
        nativeStyleToProp:{
            color:'color'
        }
    }
})

const checkboxVariants = cva(
    'rounded-md',
    {
        variants: {
            intent:{
            primary: "text-blue-500",
            secondary: "text-gray-600",
            destructive: "text-red-500"
        },

        size:{
            sm:'size-3',
            md:'size-6',
            lg:'size-8',
            xl:'size-10'
        }

        },
        defaultVariants: {
            intent:"primary",
            size:"md"
        }
    }
)

interface CheckboxProps extends
    ExpoCheckboxProps,VariantProps<typeof checkboxVariants> {}


export const Checkbox = forwardRef<ElementRef<typeof ExpoCheckbox>, CheckboxProps>(
  ({ intent, size, className, children, ...props }, ref) => {
    return (
      <ExpoCheckbox
        className={cn(checkboxVariants({ intent, size }), className)}
        {...props}
      />
    );
  }
);

Checkbox.displayName="Checkbox"