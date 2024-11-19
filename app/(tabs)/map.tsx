import React, {useEffect, useState, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView from "react-native-maps";
import GetLocation from 'react-native-get-location';
import BottomSheetMap from "@/app/(component)/bottomSheetMap";


const defaultLocation = {
    latitude: 45.5017,  // Coordonnées de Montréal
    longitude: -73.5673,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export default function GoogleMapScreen() {
    const [location, setLocation] = useState(defaultLocation);


    useEffect(() => {
        // Tente d'obtenir la position actuelle
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then((location) => {
                // Si la localisation est obtenue, mets-la à jour
                setLocation({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            })
            .catch((error) => {
                const { code, message } = error;
                console.warn(code, message);  // Gérer les erreurs si la localisation échoue
            });
    }, []);



    return (
        <View style={styles.container}>
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={styles.map}
                region={location}
            />
            <BottomSheetMap/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
    },
});
