import React from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native'
import { ArrowLeft, Settings, MapPin } from 'lucide-react-native'
import { LineChart } from 'react-native-chart-kit'

interface CourseItem {
    name: string
    progress: number
}

export default function FitnessProfile() {
    const courses: CourseItem[] = [
        { name: 'Pilates', progress: 50 },
        { name: 'CrossFit', progress: 20 },
        { name: 'Running', progress: 30 },
    ]

    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                data: [1200, 1600, 1400, 1800, 1300, 1908, 1500],
            },
        ],
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <ArrowLeft size={24} color="#000" />
                <Text style={styles.headerTitle}>Profile</Text>
                <Settings size={24} color="#000" />
            </View>

            {/* Profile Info */}
            <View style={styles.profileInfo}>
                <View style={styles.profileDetails}>
                    <View style={styles.locationContainer}>
                        <MapPin size={16} color="#666" />
                        <Text style={styles.locationText}>Los Angeles</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <View style={styles.statIcon}>
                                <Text style={styles.statIconText}>📏</Text>
                            </View>
                            <View>
                                <Text style={styles.statValue}>171 Cm</Text>
                                <Text style={styles.statLabel}>Height</Text>
                            </View>
                        </View>
                        <View style={styles.statItem}>
                            <View style={styles.statIcon}>
                                <Text style={styles.statIconText}>⚖️</Text>
                            </View>
                            <View>
                                <Text style={styles.statValue}>55 Kg</Text>
                                <Text style={styles.statLabel}>Weight</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Image
                    source={{ uri: "/placeholder.svg" }}
                    style={styles.profileImage}
                />
            </View>

            {/* Activity Section */}
            <View style={styles.activitySection}>
                <Text style={styles.sectionTitle}>Activity</Text>
                <View style={styles.tabs}>
                    <Text style={[styles.tabText, styles.activeTab]}>WEEK</Text>
                    <Text style={styles.tabText}>MONTH</Text>
                    <Text style={styles.tabText}>ALL TIME</Text>
                </View>

                <View style={styles.chartContainer}>
                    <LineChart
                        data={chartData}
                        width={320}
                        height={180}
                        chartConfig={{
                            backgroundColor: '#fff',
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 111, 97, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        bezier
                        style={styles.chart}
                    />
                </View>
            </View>

            {/* Course Section */}
            <View style={styles.courseSection}>
                <Text style={styles.sectionTitle}>Cource</Text>
                {courses.map((course, index) => (
                    <View key={index} style={styles.courseItem}>
                        <View style={styles.courseHeader}>
                            <Text style={styles.courseName}>{course.name}</Text>
                            <Text style={styles.coursePercentage}>{course.progress}%</Text>
                        </View>
                        <View style={styles.progressBarBackground}>
                            <View
                                style={[
                                    styles.progressBarFill,
                                    { width: `${course.progress}%` },
                                ]}
                            />
                        </View>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    profileInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    profileDetails: {
        flex: 1,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    locationText: {
        marginLeft: 4,
        color: '#666',
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 24,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#FFF5F3',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statIconText: {
        fontSize: 20,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    activitySection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    tabs: {
        flexDirection: 'row',
        gap: 24,
        marginBottom: 16,
    },
    tabText: {
        color: '#666',
        fontSize: 12,
    },
    activeTab: {
        color: '#FF6F61',
        fontWeight: '600',
    },
    chartContainer: {
        alignItems: 'center',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    courseSection: {
        gap: 16,
    },
    courseItem: {
        gap: 8,
    },
    courseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courseName: {
        fontSize: 14,
        fontWeight: '500',
    },
    coursePercentage: {
        fontSize: 12,
        color: '#666',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#FF6F61',
        borderRadius: 4,
    },
})

