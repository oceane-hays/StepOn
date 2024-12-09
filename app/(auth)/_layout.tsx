import { Tabs } from "expo-router";

export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="signin"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="smsVerification"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
