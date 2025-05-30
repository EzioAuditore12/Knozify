import { Stack } from "expo-router";
import React from "react";

//TODO: Need to imrpove multi step form setup in registeration form

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="step2"/>
            <Stack.Screen name="step3"/>
            <Stack.Screen name="step4"/>
            <Stack.Screen name="step5"/>
        </Stack>
    );
}