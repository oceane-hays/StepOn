import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import {LineChart} from 'react-native-chart-kit';

interface BarProps {
    data: number[];
    labels: string[];
}

export default function Bar({ data, labels }: BarProps) {
    const screenWidth = Dimensions.get('window').width;

    const chartData = useMemo(() => ({
        labels,
        datasets: [
            {
                data,
            },
        ],
    }), [data, labels]);

    return (
        <LineChart
            data={chartData}
            width={screenWidth - 20} // Add padding adjustment
            height={220}
            yAxisLabel="" // Optional: Add a prefix like "$" or "%"
            yAxisSuffix="" // Optional: Add a suffix like "kg" or "steps"
            chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0, // Adjust to remove decimals
                color: (opacity = 1) => `rgba(236, 161, 90, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
            }}
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
        />
    );
}
