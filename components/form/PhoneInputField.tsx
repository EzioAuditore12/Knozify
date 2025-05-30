import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { cn } from '@/utils/tailwind-cn';


//TODO: Need to fix phone number input component

interface PhoneInputProps {
  value?: string;
  onChangeText?: (phoneNumber: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export interface PhoneInputRef {
  focus: () => void;
  blur: () => void;
  getFullNumber: () => string;
  getCountryCode: () => string;
  getNumber: () => string;
}

export const PhoneInputField = forwardRef<PhoneInputRef, PhoneInputProps>(({
  value = '',
  onChangeText,
  placeholder = 'Enter phone number',
  disabled = false,
  error,
  label,
  containerClassName = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
}, ref) => {
  const [phoneNumber, setPhoneNumber] = useState(value);
  const inputRef = React.useRef<TextInput>(null);
  
  // India country code
  const countryCode = '+91';
  const flag = '🇮🇳';

  // Sync external value changes
  useEffect(() => {
    setPhoneNumber(value);
  }, [value]);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    getFullNumber: () => `${countryCode}${phoneNumber}`,
    getCountryCode: () => countryCode,
    getNumber: () => phoneNumber,
  }));

  const handlePhoneChange = (text: string) => {
    // Remove non-numeric characters
    const cleaned = text.replace(/[^0-9]/g, '');
    // Limit to 10 digits for Indian mobile numbers
    const limited = cleaned.slice(0, 10);
    setPhoneNumber(limited);
    onChangeText?.(limited);
  };

  const formatPhoneNumber = (number: string) => {
    // Indian phone number formatting: XXXXX-XXXXX
    if (number.length >= 5) {
      return number.replace(/(\d{5})(\d{0,5})/, '$1-$2');
    }
    return number;
  };

  return (
    <View className={cn('w-full', containerClassName)}>
      {label && (
        <Text className={cn('text-gray-700 font-medium mb-2', labelClassName)}>
          {label}
        </Text>
      )}
      
      <View className={cn(
        'flex-row items-center border border-gray-300 rounded-lg bg-white',
        error && 'border-red-500',
        disabled && 'bg-gray-100 opacity-60'
      )}>
        {/* India Country Code (Fixed) */}
        <View className="flex-row items-center px-3 py-4 border-r border-gray-300">
          <Text className="text-xl mr-2">{flag}</Text>
          <Text className="text-gray-700 font-medium">
            {countryCode}
          </Text>
        </View>

        {/* Phone Number Input */}
        <TextInput
          ref={inputRef}
          className={cn(
            'flex-1 px-3 py-4 text-gray-900 text-base',
            inputClassName
          )}
          value={formatPhoneNumber(phoneNumber)}
          onChangeText={handlePhoneChange}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
          editable={!disabled}
          maxLength={11} // 10 digits + 1 hyphen
        />
      </View>

      {error && (
        <Text className={cn('text-red-500 text-sm mt-1', errorClassName)}>
          {error}
        </Text>
      )}
    </View>
  );
});

PhoneInputField.displayName = 'PhoneInputField';

