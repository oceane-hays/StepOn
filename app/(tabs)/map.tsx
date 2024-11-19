import React, { useEffect, useState, useRef, useCallback } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Button, Dimensions} from "react-native";
import MapView from "react-native-maps";
import BottomSheetMap from "@/app/(component)/bottomSheetMap";
import {getCurrentLocation} from "@/services/locationservice";
import * as Location from 'expo-location';
import { Marker } from "react-native-maps";

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function GoogleMapScreen() {
    const [location , setLocation]  = useState();
    const [address, setAddress] = useState();


    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Please grant location permissions");
                return;
            }

            const { coords } : any = await Location.getCurrentPositionAsync({});
            setLocation(coords);
            console.log("Location:");
            console.log(coords);

            if(coords){
                console.log(coords['latitude'],coords['longitude']);
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



    return (
        <View style={styles.container}>
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={location}>
                {location !== undefined && (
                    <Marker coordinate={location}/>
                )}
            </MapView>
            <BottomSheetMap />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: "center",
    },
});
