import { LinearGradient } from "@/components/ui";
import { ScrollContainer } from "@/components/ui/layout";
import { cn } from "@/lib/utils";
import { KeyboardAvoidingView, Platform } from "react-native";
import { type ReactNode } from "react";

type AuthLayoutProps = {
    children: ReactNode;
    className?: string;
    showGradient?: boolean;
};

export function AuthLayout({ 
    children, 
    className,
    showGradient = true 
}: AuthLayoutProps) {
    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <ScrollContainer 
                contentContainerClassName={cn("p-2", className)}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                {showGradient && <LinearGradient position={"absolute"} size={"screen"} />}

                {children}
            </ScrollContainer>
        </KeyboardAvoidingView>
    );
}

export type { AuthLayoutProps };