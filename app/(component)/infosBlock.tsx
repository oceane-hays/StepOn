import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {LocateIcon, TimerIcon} from "lucide-react-native"; // Assuming you're using Expo for icons

interface InformationBlockProps {
    duration?: string;
    distance?: string;
    onStart: () => void;
    onSaveForLater: () => void;
}

const InformationBlock: React.FC<InformationBlockProps> = ({ duration, distance, onStart, onSaveForLater }) => {
    return (
        <View style={styles.container}>
            <View style={styles.infoRow}>
                <LocateIcon />
                <Text style={styles.infoText}>{distance || 'N/A'}</Text>
            </View>
            <View style={styles.infoRow}>
                <TimerIcon />
                <Text style={styles.infoText}>{duration || 'N/A'}</Text>
            </View>
            <View style={styles.infoRow}>
                <Image source={require('./../../assets/images/fire-icon.png')} style={styles.fireIcon} />
                <Text style={styles.infoText}>{duration || 'N/A'}</Text>
            </View>
            <TouchableOpacity style={styles.startButton} onPress={onStart}>
                <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={onSaveForLater}>
                <Text style={styles.saveButtonText}>Save for later</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginTop: 150,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 16,
    },
    startButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    startButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveButton: {
        padding: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    saveButtonText: {
        color: '#007AFF',
        fontSize: 16,
    },
    fireIcon: {
        width: 40,
        height: 30
    },
});

export default InformationBlock;

