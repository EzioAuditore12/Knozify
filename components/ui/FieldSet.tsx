// TODO : Need to write and improve filed set component for the ui
import { View, ViewProps } from 'react-native'
import { Text } from './Text'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/tailwind-cn'
import React from 'react'

const fieldsetVariants = cva(
  "border border-gray-300 rounded-lg p-3 my-2 relative",
  {
    variants: {
      intent: {
        primary: "",
        secondary: "border-gray-400",
        error: "border-red-400",
      },
      size: {
        base: "",
        sm: "p-2",
        lg: "p-5",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "base",
    },
  }
)

const legendVariants = cva(
  "absolute bg-white px-1 text-gray-600",
  {
    variants: {
      intent: {
        primary: "",
        secondary: "text-gray-400",
        error: "text-red-500",
      },
      size: {
        base: "text-sm",
        sm: "text-xs",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      intent: "secondary",
      size: "sm",
    },
  }
)

type FieldsetProps = React.PropsWithChildren<{
  legend: string
  className?: string
  style?: any
  legendClassName?: string
  legendStyle?: any
  intent?: VariantProps<typeof fieldsetVariants>['intent']
  size?: VariantProps<typeof fieldsetVariants>['size']
  legendIntent?: VariantProps<typeof legendVariants>['intent']
  legendSize?: VariantProps<typeof legendVariants>['size']
}>

export const Fieldset = ({
  legend,
  children,
  className,
  style,
  legendClassName,
  legendStyle,
  intent,
  size,
  legendIntent,
  legendSize,
}: FieldsetProps) => (
  <View
    className={cn(fieldsetVariants({ intent, size }), className)}
    style={[
      {
        // fallback for border if tailwind not present
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        position: 'relative',
      },
      style,
    ]}
  >
    <Text
      className={cn(
        legendVariants({ intent: legendIntent, size: legendSize }),
        legendClassName
      )}
      style={[
        {
          position: 'absolute',
          top: -14,
          left: 12,
          backgroundColor: 'white',
          paddingHorizontal: 4,
          fontSize: 14,
          color: '#666',
        },
        legendStyle,
      ]}
      intent={legendIntent === "error" ? "destructive" : legendIntent}
      size={legendSize}
    >
      {legend}
    </Text>
    {children}
  </View>
)