import DateTimePicker, { type DateTimePickerEvent} from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Platform, TouchableOpacity,TouchableOpacityProps, Text } from "react-native"
import { cn } from '@/utils/tailwind-cn'

export interface DateInputProps extends TouchableOpacityProps {
    value?: string | Date | null;
    onDateChange?: (date: Date | null) => void;
    placeholder?: string;
    mode?: 'date' | 'time' | 'datetime';
    display?: 'default' | 'spinner' | 'calendar' | 'clock';
}

export const DateInput = ({
    className,
    value,
    onDateChange,
    placeholder = "Select the date",
    mode = "date",
    display = "default",
    ...props
}: DateInputProps) => {
    const [internalDate, setInternalDate] = useState<Date | null>(
        value ? (typeof value === 'string' ? new Date(value) : value) : null
    );
    const [show, setShow] = useState(false);

    // Convert string value to Date if needed
    const getDateValue = () => {
        if (value === undefined) return internalDate;
        if (value === null) return null;
        if (typeof value === 'string') return new Date(value);
        return value;
    };

    const currentDate = getDateValue();

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const newDate = selectedDate || currentDate;
        setShow(Platform.OS === 'ios');
        
        if (value === undefined) {
            setInternalDate(newDate);
        }
        
        onDateChange?.(newDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const formatDisplayDate = (date: Date | null) => {
        if (!date) return placeholder;
        return date.toLocaleDateString();
    };

    return (
        <>
            <TouchableOpacity
                className={cn("p-3 bg-transparent rounded-md border-2 border-black dark:border-white", className)}
                onPress={showDatepicker}
                {...props}
            >
                <Text className="text-gray-900 dark:text-white">
                    {formatDisplayDate(currentDate)}
                </Text>
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={currentDate || new Date()}
                    mode={mode}
                    display={display}
                    onChange={onChange}
                />
            )}
        </>
    );
};