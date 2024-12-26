import React, { useMemo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';

interface BarProps {
    data?: number[];
    labels?: string[];
}

export default function Bar({ data, labels }: BarProps) {
    const screenWidth = Dimensions.get('window').width;

    const chartData = useMemo(() => ({
        labels: labels || ['mon', 'tue', 'wed', 'thu', 'fri', 'sat','sun'],
        datasets: [
            {
                data: data || Array(6).fill(0).map(() => Math.floor(Math.random() * 1000)),
            },
        ],
    }), [data, labels]);

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(236, 161, 90, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '3',
            strokeWidth: '2',
            stroke: '#ffa726',
        },
    };

    return (
        <View style={styles.container}>
            <LineChart
                data={chartData}
                width={screenWidth - 80}
                height={200}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={chartConfig}
                style={styles.chart}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    chart: {
        borderRadius: 16,
    },
});

