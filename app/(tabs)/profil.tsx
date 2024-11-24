import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Settings, Edit, LogOut } from 'lucide-react-native';

export default function ProfileScreen({ navigation } : any) {
    const user = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        bio: 'Passionate developer | Coffee enthusiast | Dog lover',
        avatar: '/placeholder.svg?height=100&width=100',
        followers: 1234,
        following: 567,
    };

    const handleLogOut = async () => {
        const code = verificationCode.join('');
        console.log('Submitting code:', code);

        if (!code) {
            console.error('Verification code is empty');
            return;
        }
        // ...
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsButton}>
                        <Settings color="#5E83C0" size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileInfo}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                    <Text style={styles.bio}>{user.bio}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{user.followers}</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{user.following}</Text>
                        <Text style={styles.statLabel}>Following</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
                    <Edit color="#FFFFFF" size={20} />
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    {/* Add your recent activity components here */}
                    <Text style={styles.placeholderText}>No recent activity</Text>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
                    <LogOut color="#5E83C0" size={20} />
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 16,
    },
    settingsButton: {
        padding: 8,
    },
    profileInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5E83C0',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#8DACD2',
        marginBottom: 8,
    },
    bio: {
        fontSize: 14,
        color: '#333333',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    statItem: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5E83C0',
    },
    statLabel: {
        fontSize: 14,
        color: '#8DACD2',
    },
    statDivider: {
        width: 1,
        height: '100%',
        backgroundColor: '#8DACD2',
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5E83C0',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    editButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    sectionContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5E83C0',
        marginBottom: 10,
    },
    placeholderText: {
        fontSize: 14,
        color: '#8DACD2',
        fontStyle: 'italic',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#5E83C0',
    },
    logoutButtonText: {
        color: '#5E83C0',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});