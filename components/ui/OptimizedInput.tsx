import React, {
    useState,
    useCallback,
    useMemo,
    useRef,
    useImperativeHandle,
    forwardRef,
    memo,
    type ComponentPropsWithRef,
  } from 'react'
  import { TextInput, TextInputProps, type View, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native' // Assuming View might be needed, or adjust imports as necessary
  import { cva, type VariantProps } from 'class-variance-authority'
  import { cn } from '@/utils/tailwind-cn'
  
  // 1. Define your CVA variants
  const inputVariants = cva(
    'rounded-md px-3 py-2 border-2 transition-colors',
    {
      variants: {
        focus: {
          true:  'border-blue-500 bg-white',
          false: 'border-gray-400 bg-gray-100',
        },
      },
      defaultVariants: { focus: false },
    }
  )
  
  // 2. Compose your prop types
  type InputVariantProps = VariantProps<typeof inputVariants>
  export interface FocusableInputProps
    extends Omit<TextInputProps, 'onFocus' | 'onBlur'>,
            Omit<InputVariantProps, 'focus'> {
    onFocus?: TextInputProps['onFocus']
    onBlur?:  TextInputProps['onBlur']
  }
  
  export interface FocusableInputHandle {
    focus: () => void;
    blur: () => void;
  }
  
  // 3. Build the inner component
  const _FocusableInput = (
    props: FocusableInputProps,
    ref: React.ForwardedRef<FocusableInputHandle>
  ) => {
    const { onFocus: propOnFocus, onBlur: propOnBlur, className, ...rest } = props
  
    // Track focus state for styling
    const [isFocused, setIsFocused] = useState(false)
  
    // Keep a local ref so we can expose imperative methods
    const internalRef = useRef<TextInput>(null)
    useImperativeHandle(ref, () => ({
      focus: () => internalRef.current?.focus(),
      blur:  () => internalRef.current?.blur(),
    }))
  
    // Stable handlers
    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true)
        propOnFocus?.(e)
      },
      [propOnFocus]
    )
  
    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false)
        propOnBlur?.(e)
      },
      [propOnBlur]
    )
  
    // Memoized className
    const resolvedClassName = useMemo(
      () => cn(inputVariants({ focus: isFocused }), className),
      [isFocused, className]
    )
  
    return (
      <TextInput
        ref={internalRef}
        className={resolvedClassName}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    )
  }
  
  // 4. Wrap with forwardRef + memo
  export const FocusableInput = memo(
    forwardRef<FocusableInputHandle, FocusableInputProps>(_FocusableInput)
  )
  
  // Optional: give a display name for DevTools
  FocusableInput.displayName = 'FocusableInput'
