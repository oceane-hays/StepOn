import {StyleSheet, Text, View} from "react-native";
import React from "react";

export function InfoItem({ icon, text }: { icon: JSX.Element; text: string }) {
    return (
        <View style={styles.infoItem}>
            {icon}
            <Text style={styles.infoText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    infoText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#333',
    },
})