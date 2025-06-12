import { buttonTextVariants, buttonVariants } from "@/components/ui/button";
import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import {
	Action,
	type ActionProps,
	type ActionRef,
	Cancel,
	type CancelProps,
	type CancelRef,
	Content,
	type ContentProps,
	type ContentRef,
	Description,
	type DescriptionProps,
	type DescriptionRef,
	Overlay,
	type OverlayProps,
	type OverlayRef,
	Portal,
	Root,
	Title,
	type TitleProps,
	type TitleRef,
	Trigger,
	useRootContext,
} from "@rn-primitives/alert-dialog";
import { type RefObject } from "react";
import { View, type ViewProps } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const AlertDialog = Root;

const AlertDialogTrigger = Trigger;

const AlertDialogPortal = Portal;

function AlertDialogOverlay({
	className,
	children,
	...props
}: OverlayProps & {
	ref?: RefObject<OverlayRef>;
}) {
	return (
		<Overlay
			className={cn(
				"z-50 absolute top-0 right-0 bottom-0 left-0 bg-black/80 flex justify-center items-center p-2",
				className,
			)}
			{...props}
			asChild
		>
			<Animated.View
				entering={FadeIn.duration(150)}
				exiting={FadeOut.duration(150)}
			>
				{children}
			</Animated.View>
		</Overlay>
	);
}

function AlertDialogContent({
	className,
	portalHost,
	...props
}: ContentProps & {
	ref?: RefObject<ContentRef>;
	portalHost?: string;
}) {
	return (
		<AlertDialogPortal hostName={portalHost}>
			<AlertDialogOverlay>
				<Content
					className={cn(
						"z-50 max-w-lg gap-4 border border-border bg-background p-6 shadow-lg shadow-foreground/10 rounded-lg",
						className,
					)}
					{...props}
				/>
			</AlertDialogOverlay>
		</AlertDialogPortal>
	);
}

function AlertDialogHeader({ className, ...props }: ViewProps) {
	return <View className={cn("flex flex-col gap-2", className)} {...props} />;
}

function AlertDialogFooter({ className, ...props }: ViewProps) {
	return (
		<View className={cn("flex flex-col-reverse gap-2", className)} {...props} />
	);
}

function AlertDialogTitle({
	className,
	...props
}: TitleProps & {
	ref?: RefObject<TitleRef>;
}) {
	return (
		<Title
			className={cn("text-xl text-foreground font-semibold", className)}
			{...props}
		/>
	);
}

function AlertDialogDescription({
	className,
	...props
}: DescriptionProps & {
	ref?: RefObject<DescriptionRef>;
}) {
	return (
		<Description
			className={cn("text-base text-muted-foreground", className)}
			{...props}
		/>
	);
}

function AlertDialogAction({
	className,
	...props
}: ActionProps & {
	ref?: RefObject<ActionRef>;
}) {
	return (
		<TextClassContext.Provider value={buttonTextVariants({ className })}>
			<Action className={cn(buttonVariants(), className)} {...props} />
		</TextClassContext.Provider>
	);
}

function AlertDialogCancel({
	className,
	...props
}: CancelProps & {
	ref?: RefObject<CancelRef>;
}) {
	return (
		<TextClassContext.Provider
			value={buttonTextVariants({ className, variant: "outline" })}
		>
			<Cancel
				className={cn(buttonVariants({ variant: "outline", className }))}
				{...props}
			/>
		</TextClassContext.Provider>
	);
}

export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
};
