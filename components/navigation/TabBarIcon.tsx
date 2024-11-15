// @/components/navigation/TabBarIcon.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // or any other icon library

type TabBarIconProps = {
    name: string;
    color: string;
};

export const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color } : any) => {
    return <Ionicons name={name} size={24} color={color} />;
};
