import React, {useRef, useState} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import 'react-native-get-random-values';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_API_KEY} from "@/services/GOOGLE_MAPS_API_KEY";
import {LATITUDE_DELTA} from "@/services/LATITUDE_DELTA";
import {LONGITUDE_DELTA} from "@/services/LONGITUDE_DELTA.tsX";


export default function SearchBar({ mapRef, setDestination } : any) {
    const [isFocused, setIsFocused] = useState(false);



    const handlePlaceSelection = (data: any, details: any) => {
        const location = details?.geometry?.location;
        if (location) {
            onPressAddress(details);
            console.log("Selected Location:", JSON.stringify(location));
        } else {
            console.log("No location details available");
        }
    };

    const onPressAddress = (details : any) => {
        setDestination({
            latitude: details?.geometry?.location.lat,
            longitude: details?.geometry?.location.lng,
        });
        moveToLocation(
            details?.geometry?.location.lat,
            details?.geometry?.location.lng,
        );
    };

    const moveToLocation = async (latitude : any, longitude : any)  => {
        mapRef.current.animateToRegion(
            {
                latitude,
                longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            2000,
        );
    };

    return (
        <View style={styles.container}>

            <GooglePlacesAutocomplete
                placeholder="Search"
                onPress={handlePlaceSelection}
                query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'en',
                }}
                onFail={(error) => {console.log(error)}}
                fetchDetails
                keyboardShouldPersistTaps="handled"
                styles={{
                    textInput: isFocused ? styles.textInputFocused : styles.textInput,
                    container: styles.inputContainer,
                }}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute", // Rend la barre flottante
        top: 10, // Ajuste la position verticale
        left: 10, // Ajuste la position horizontale
        right: 10, // Assure un alignement centré en fonction de l'écran
        zIndex: 1, // Place la barre devant les autres éléments
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        height: 50,
        borderRadius: 25,
        paddingLeft: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    inputContainer: {
        width: "95%",
    },
    textInputFocused: {
        borderWidth: 1,
        borderColor: "darkblue",
        height: 50,
        borderRadius: 25,
        paddingLeft: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
});
