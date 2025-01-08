import React, {useEffect, useState} from 'react'
import {View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity} from 'react-native'
import {ArrowLeft, Settings, MapPin, MailboxIcon, PhoneIcon, HeartIcon} from 'lucide-react-native'
import { LineChart } from 'react-native-chart-kit'
import Bar from "@/app/(component)/Bar";
import Logo from "@/app/(component)/logo";
import {Colors} from "@/services/COLORS";
import PathCard from "@/app/(component)/pathCard";
import {router} from "expo-router";
import * as Location from "expo-location";
import {LATITUDE_DELTA} from "@/services/LATITUDE_DELTA";
import {LONGITUDE_DELTA} from "@/services/LONGITUDE_DELTA";
import {fetchUsers, UserData} from "@/app/(component)/user";

interface CourseItem {
    name: string
    progress: number
}

export default function FitnessProfile() {

    const [location, setLocation] = useState();
    const [users, setUsers] = useState<UserData[]>([]);


    useEffect(() => {
        fetchUsers(setUsers);

        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Please grant location permissions");
                return;
            }

            const { coords }: any = await Location.getCurrentPositionAsync({});
            setLocation(coords);
            console.log("Location:");
            console.log(coords);

            if (coords) {
                console.log(coords["latitude"], coords["longitude"]);
                setLocation({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                });
            }
        };
        getPermissions();
    }, []);

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

    const handleLogOut = () => {
        router.push('/(auth)/login')
    }


    console.log('sss', users);
    return (
        <SafeAreaView style={styles.container}>

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 20, // Ajustez si nécessaire
                    paddingTop: 10,
                }}
            >

                <View style={styles.imageProfileContainer}>
                    <Image
                        source={require('./../../assets/images/profile.png')}
                        style={styles.imageProfile}
                    />
                </View>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>PROFIL</Text>
                    <Text style={styles.headerTitle}>{ users[0]?.name }</Text>
                    <TouchableOpacity onPress={handleLogOut}>
                        <Image source={require('./../../assets/images/images.png')} resizeMode={'contain'}
                               style={{width:35,height:35}} />
                    </TouchableOpacity>
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
                                    <Text style={styles.statValue}>{ users[0]?.height }</Text>
                                    <Text style={styles.statLabel}>Height</Text>
                                </View>
                            </View>
                            <View style={styles.statItem}>
                                <View style={styles.statIcon}>
                                    <Text style={styles.statIconText}>⚖️</Text>
                                </View>
                                <View>
                                    <Text style={styles.statValue}> { users[0]?.weight }</Text>
                                    <Text style={styles.statLabel}>Weight</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.locationContainer}>
                            <MapPin size={24} color={Colors.bleu_clair} />
                            <Text style={styles.locationText}>{ users[0]?.address }</Text>
                        </View>
                        <View style={styles.locationContainer}>
                            <MailboxIcon size={24} color={Colors.bleu_clair} />
                            <Text style={styles.locationText}>{ users[0]?.email }</Text>
                        </View>
                        <View style={styles.locationContainer}>
                            <PhoneIcon size={24} color={Colors.bleu_clair} />
                            <Text style={styles.locationText}>+1 { users[0]?.phoneNumber }</Text>
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

                    <PathCard
                        time = {40}
                        steps = {5000}
                        location = {location}
                        distanceSteps={5000}
                        onPress={() => router.push('/(findway)/map-route')}
                    />

                </View>


                {/* Save Section */}
                <View style={styles.activitySection}>
                    <Text style={styles.sectionTitle}>Post Course</Text>
                    <View key={1} style={styles.placeCard}>
                        <Image source={require('./../../assets/images/BeaverLake.png')} style={styles.placeImage} />
                        <View style={styles.placeInfo}>
                            <Text style={styles.placeName}>Beaver Lake</Text>
                            <Text style={styles.placeDistance}>7 632 steps</Text>
                            <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>@Jane.Doe</Text>
                        </View>
                        <Text style={styles.placeName}>1 234 Like</Text>
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
    placeCard: {
        width: 200,
        height: 280,
        marginRight: 15,
        borderRadius: 20,
        overflow: 'hidden',
    },
    placeImage: {
        width: '100%',
        height: '100%',
    },
    placeInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    placeName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    placeDistance: {
        color: '#fff',
        opacity: 0.8,
    },
    likeButton: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },

})

