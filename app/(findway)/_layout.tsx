import { Tabs } from 'expo-router';

export default function RouteLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="map-route"
                options={{
                    href: '/map-route',
                }}
            />
            <Tabs.Screen
                name="choose-route"
                options={{
                    href: '/choose-route',
                }}
            />
            <Tabs.Screen
                name="plan-route"
                options={{
                    href: '/plan-route',
                }}
            />
        </Tabs>
    );
}
