import type { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";

// Cache the processed icons to avoid repeated processing
const processedIcons = new WeakSet<LucideIcon>();

export function iconWithClassName(icon: LucideIcon) {
	if (processedIcons.has(icon)) {
		return;
	}

	cssInterop(icon, {
		className: {
			target: "style",
			nativeStyleToProp: {
				color: true,
				opacity: true,
			},
		},
	});

	processedIcons.add(icon);
}
