import React from 'react'
import {View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native'
import {ArrowLeft, Settings, MapPin, MailboxIcon, PhoneIcon} from 'lucide-react-native'
import { LineChart } from 'react-native-chart-kit'
import Bar from "@/app/(component)/Bar";
import Logo from "@/app/(component)/logo";
import {Colors} from "@/services/COLORS";
import PathCard from "@/app/(component)/pathCard";

interface CourseItem {
    name: string
    progress: number
}

export default function FitnessProfile() {
    const [activeTab, setActiveTab] = React.useState('STEPS');

    const stepData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                data: [1200, 1600, 1400, 1800, 1300, 1908, 1500],
            },
        ],
    }

    const weightData = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        datasets: [
            {
                data: [61, 62.4, 61.5, 60.6, 60, 61.2, 59.9, 61, 62.4, 61.5, 60.6, 60],
            },
        ],
    }

    const handleModification = () => {
        Alert.alert('modify')
    }

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>

                <View style={styles.imageProfileContainer}>
                    <Image
                        source={require('./../../assets/images/profile.png')}
                        style={styles.imageProfile}
                    />
                </View>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>PROFIL</Text>
                    <Settings size={24} color="#000" onPress={handleModification}/>
                </View>

                {/* Profile Info */}
                <View style={styles.profileInfo}>
                    <View style={styles.profileDetails}>

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

                        <View style={styles.locationContainer}>
                            <MapPin size={24} color={Colors.bleu_clair} />
                            <Text style={styles.locationText}>Universite de Montreal</Text>
                        </View>
                        <View style={styles.locationContainer}>
                            <MailboxIcon size={24} color={Colors.bleu_clair} />
                            <Text style={styles.locationText}>email User @umontreal.ca</Text>
                        </View>
                        <View style={styles.locationContainer}>
                            <PhoneIcon size={24} color={Colors.bleu_clair} />
                            <Text style={styles.locationText}>+1 xxx xxxx0</Text>
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
                        <Text
                            style={[styles.tabText, activeTab === 'STEPS' && styles.activeTab]}
                            onPress={() => setActiveTab('STEPS')}
                        >
                            STEPS
                        </Text>
                        <Text
                            style={[styles.tabText, activeTab === 'WEIGHT' && styles.activeTab]}
                            onPress={() => setActiveTab('WEIGHT')}
                        >
                            WEIGHT
                        </Text>
                    </View>

                    <View style={styles.chartContainer}>
                        <Bar
                            data={activeTab === 'STEPS' ? stepData.datasets[0].data : weightData.datasets[0].data}
                            labels={activeTab === 'STEPS' ? stepData.labels : weightData.labels}
                        />
                    </View>
                </View>


                {/* Course Section */}
                <View style={styles.activitySection}>
                    <Text style={styles.sectionTitle}>Last Course</Text>
                    <View style={styles.tabs}>
                        <PathCard />
                    </View>
                </View>

                {/* Save Section */}
                <View style={styles.activitySection}>
                    <Text style={styles.sectionTitle}>Save Course</Text>
                    <View style={styles.tabs}>
                        <Text style={[styles.tabText, styles.activeTab]}>WEEK</Text>
                        <Text style={styles.tabText}>MONTH</Text>
                        <Text style={styles.tabText}>ALL TIME</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageProfileContainer: {
        alignSelf: 'center',
        borderRadius: 50,
        width: 100, // Largeur ajustée
        height: 100, // Hauteur ajustée
        borderColor: '#fff',
        borderWidth: 1, // Ajout d'une bordure visible
        shadowColor: '#FFA500', // Couleur de l'ombre (orange foncé)
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5, // Pour les ombres sous Android
        marginVertical: 30,
        overflow: 'hidden', // Pour que l'image respecte les bordures arrondies
    },
    imageProfile: {
        width: '100%', // L'image s'ajuste à la taille du conteneur
        height: '100%',
        resizeMode: 'cover', // Ajuste l'image en couvrant tout l'espace
    },

    header: {
        marginBottom: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        alignSelf: "center"
    },
    profileInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        borderWidth: 1,
        backgroundColor : "#fff",
        borderRadius: 20,
        borderColor: '#fff',
        shadowColor: Colors.orange_fonce,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        padding: 20
    },
    profileDetails: {
        flex: 1,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
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
        margin: 20,
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
        margin: 20,
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

