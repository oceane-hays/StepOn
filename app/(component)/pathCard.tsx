import React, {useEffect, useRef, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, {Marker, Region} from "react-native-maps";
import {LATITUDE_DELTA} from "@/services/LATITUDE_DELTA";
import {LONGITUDE_DELTA} from "@/services/LONGITUDE_DELTA";
import {Colors} from "@/services/COLORS";
import {Clock, Footprints, MapPin, SunIcon} from "lucide-react-native";
import {InfoItem} from "@/app/(component)/infoItem";
import {formattedTime} from "@/services/formattedTime";
import {formattedSteps} from "@/services/formattedSteps";
import MapViewDirections from "react-native-maps-directions";
import {GOOGLE_MAPS_API_KEY} from "@/services/GOOGLE_MAPS_API_KEY";
import {GenerateRoundTrip} from "@/app/(component)/RouteComponent/generateRoute";
import {Destination} from "@/app/(component)/RouteComponent/types";

const DEFAULT_LOCATION: Region = {
    latitude: 45.5010498,
    longitude: -73.6156192,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

const height = 1.7; // in meters

export default function PathCard({ onPress, time, steps, location } : any)  {
    const mapRef: any = useRef();

    const [distance, setDistance] = useState(0);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const route = GenerateRoundTrip(DEFAULT_LOCATION, 4000, height);

    useEffect(() => {
        const newDestinations: Destination[] = route.map((point) => {
            if ("center" in point && point.center) {
                return point.center;
            } else {
                return { latitude: point.latitude, longitude: point.longitude };
            }
        });
        setDestinations(newDestinations);
    }, []);

    return (
        <View style={styles.card}>
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    provider={MapView.PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: route[0].latitude,
                        longitude: route[0].longitude,
                        latitudeDelta: route[0].latitudeDelta,
                        longitudeDelta: route[0].longitudeDelta,
                    }}
                >
                    {destinations.map((point, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: point.latitude,
                                longitude: point.longitude,
                            }}
                            title={`Point ${index}`}
                        />
                    ))}
                    {destinations.map((destination, index) => {
                        if (index === 0) return null;
                        console.log(distance);
                        return (
                            <MapViewDirections
                                key={index}
                                origin={destinations[index - 1]}
                                destination={destination}
                                apikey={GOOGLE_MAPS_API_KEY}
                                strokeColor="orange"
                                strokeWidth={4}
                                onError={(error) => console.log("Directions error:", error)}
                                onReady={(result) => {
                                    setDistance(result.distance); // Distance in kilometers
                                }}
                            />
                        );
                    })}
                </MapView>


                <View style={styles.details}>
                    <View style={styles.contentContainer}>
                        <View >
                            <InfoItem icon={<MapPin size={20} color={Colors.bleu_fonce} />} text={location} />
                            <InfoItem icon={<Footprints size={20} color={Colors.bleu_fonce} />} text={`${formattedSteps(steps)} steps`} />
                            <InfoItem icon={<Clock size={20} color={Colors.bleu_fonce} />} text={formattedTime(time)} />
                            <InfoItem icon={<SunIcon size={20} color={Colors.bleu_fonce} />} text='21°C' />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <Text style={styles.buttonText}>Start</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
        marginVertical: 5,
        justifyContent: "flex-end",
        borderRadius: 20,
        backgroundColor: "#fff", // Couleur de fond pour éviter des problèmes visuels
        shadowColor: Colors.gris_fonce,
        shadowOffset: { width: 0, height: 2 }, // Augmentez légèrement pour plus de relief
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Ombre pour Android
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20, // Même rayon que celui de mapContainer
    },
    card: {
        borderRadius: 20,
        overflow: "visible", // Adapter selon la plateforme
        height: "95%",
        backgroundColor: "#fff", // Assurez-vous que la couleur est définie
        shadowColor: Colors.gris_fonce,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8, // Android
    },
    details: {
        width: "90%",
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        padding: 15,
    },
    timeText: {
        fontSize: 16,
        marginBottom: 5,
    },
    stepsText: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: Colors.bleu_fonce,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    contentContainer: {
        padding: 10,
    },
});
