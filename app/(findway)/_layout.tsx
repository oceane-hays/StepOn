import { Tabs } from 'expo-router';

export default function RouteLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { display: 'none' }, // This line hides the tab bar
            }}
        >
            <Tabs.Screen
                name="plan-route"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="choose-route"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="map-route"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}

