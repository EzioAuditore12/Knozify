import { ThemeToggle } from "@/components/ThemeToggle";
import { Tabs } from "expo-router";
import { Home, Search } from "lucide-react-native";

export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
					headerRight: () => <ThemeToggle />,
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
					tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
					headerRight: () => <ThemeToggle />,
				}}
			/>
		</Tabs>
	);
}
