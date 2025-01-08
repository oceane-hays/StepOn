import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Colors } from "@/services/COLORS";

interface CircularItemsProps {
    icon: JSX.Element;
    numb: number;
    pourcent: number;
    colors: string;
}

export function CircularItems({ icon, numb, pourcent, colors }: CircularItemsProps) {
    return (
        <View style={styles.container}>
            <AnimatedCircularProgress
                size={60}
                width={5}
                fill={pourcent}
                rotation={0}
                tintColor={Colors.orange_fonce}
                backgroundColor={colors}
                lineCap="round"
            >
                {(fill) => (
                    <View style={styles.innerCircle}>
                        {icon}
                    </View>
                )}
            </AnimatedCircularProgress>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        marginTop: 2,
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.bleu_fonce,
    },
});

