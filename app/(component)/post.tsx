import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import { MapPin, Footprints, Clock, User } from 'lucide-react-native';
import {InfoItem} from "@/app/(component)/infoItem";
import {formattedTime} from "@/app/(component)/formattedTime";
import {formattedSteps} from "@/app/(component)/formattedSteps";

export default function Post({ image, location, steps, name, time }: any) {


    return (
        <View style={styles.container}>
            <View style={styles.postContainer}>
                <Image source={image} style={styles.image} />
                <View style={styles.contentContainer}>
                    <View style={styles.infoContainer}>
                        <InfoItem icon={<MapPin size={16} color="#666" />} text={location} />
                        <InfoItem icon={<Footprints size={16} color="#666" />} text={`${formattedSteps(steps)} steps`} />
                        <InfoItem icon={<Clock size={16} color="#666" />} text={formattedTime(time)} />
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
        </View>
    );
}



const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    postContainer: {
        alignSelf: 'center',
        width: width - 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    image: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    contentContainer: {
        padding: 15,
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
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    posterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    posterName: {
        marginLeft: 5,
        fontSize: 14,
        color: '#666',
    },
});
