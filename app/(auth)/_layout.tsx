import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="login"
                options={{
                }}
            />
            <Stack.Screen
                name="signin"
                options={{
                }}
            />
            <Stack.Screen
                name="healthData"
                options={{
                }}
            />
            <Stack.Screen
                name="smsVerification"
                options={{
                }}
            />
        </Stack>
    );
}