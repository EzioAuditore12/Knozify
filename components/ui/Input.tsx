import { TextInput, TextInputProps } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, useState } from 'react' 
import { cn } from '@/utils/tailwind-cn'

const inputVariants = cva('rounded-md px-3 py-2 border-2 text-black dark:text-white', {
  variants: {
    focus: {
      true:  'border-blue-500 bg-gray-100 dark:bg-gray-800',
      false: 'border-gray-400',
    },
  },
  defaultVariants: { focus: false },
})


type InputVariantProps = VariantProps<typeof inputVariants>;
export interface FocusableInputProps
  extends Omit<TextInputProps, 'onFocus' | 'onBlur'>,
          Omit<InputVariantProps, 'focus'> {
  onFocus?: TextInputProps['onFocus']; 
  onBlur?: TextInputProps['onBlur'];   
}

export const Input = forwardRef< TextInput, FocusableInputProps >(
  ({ className, onFocus: propOnFocus, onBlur: propOnBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus: TextInputProps['onFocus'] = (e) => {
      setIsFocused(true);
      if (propOnFocus) {
        propOnFocus(e);
      }
    };

    const handleBlur: TextInputProps['onBlur'] = (e) => {
      setIsFocused(false);
      if (propOnBlur) {
        propOnBlur(e);
      }
    };

    return (
      <TextInput
        ref={ref}
        className={cn(inputVariants({ focus: isFocused }), className)}
 
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
)

Input.displayName='Input'