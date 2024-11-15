import React from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import { MapPin, Footprints, Clock, User } from 'lucide-react-native'


export default function Post({ image, location , steps, name, time } : any) {
    const formattedTime = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes.toString().padStart(2, '0')}min`;
    };

    // Formater les étapes avec une virgule
    const formattedSteps = new Intl.NumberFormat('fr-FR').format(steps);

    return (
        <View style={styles.postContainer}>
            <Image
                source={image}
                style={styles.image}
            />

            <View style={styles.contentContainer}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <MapPin size={16} color="#666" />
                        <Text style={styles.infoText}>{location}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Footprints size={16} color="#666" />
                        <Text style={styles.infoText}>{formattedSteps} steps</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Clock size={16} color="#666" />
                        <Text style={styles.infoText}>{formattedTime(time)}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>View Details</Text>
                </TouchableOpacity>
                <View style={styles.posterContainer}>
                    <User size={16} color="#666" />
                    <Text style={styles.posterName}>{name}</Text>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    postContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    image: {
        width: '40%',
        height: 200,
        borderRadius: 10
    },
    contentContainer: {
        flex: 1,
        padding: 15,
        justifyContent: 'space-between',
    },
    infoContainer: {
        marginBottom: 10,
    },
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
    button: {
        backgroundColor: '#5E83C0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    posterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    posterName: {
        marginLeft: 5,
        fontSize: 12,
        color: '#666',
    },
})