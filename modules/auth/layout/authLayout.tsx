import { LinearGradient } from "@/components/ui";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import {
	KeyboardAvoidingView,
	KeyboardAwareScrollView,
} from "react-native-keyboard-controller";

type AuthLayoutProps = {
	children: ReactNode;
	className?: string;
	showGradient?: boolean;
};

export function AuthLayout({
	children,
	className,
	showGradient = true,
}: AuthLayoutProps) {
	return (
		<KeyboardAvoidingView style={{ flex: 1 }}>
			<KeyboardAwareScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				keyboardShouldPersistTaps="handled"
				contentContainerClassName={cn("p-2", className)}
			>
				{showGradient && (
					<LinearGradient position={"absolute"} size={"screen"} />
				)}

				{children}
			</KeyboardAwareScrollView>
		</KeyboardAvoidingView>
	);
}

export type { AuthLayoutProps };
