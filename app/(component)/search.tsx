import React, {useRef, useState} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import 'react-native-get-random-values';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_API_KEY} from "@/services/GOOGLE_MAPS_API_KEY";
import {LATITUDE_DELTA} from "@/services/LATITUDE_DELTA";
import {LONGITUDE_DELTA} from "@/services/LONGITUDE_DELTA";


export default function SearchBar({ setDestination } : any) {
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
    };


    return (
        <View style={styles.container}>

            <GooglePlacesAutocomplete
                placeholder="Add a stop or a Destination"
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
        flex: 1,
        marginTop: 20,
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
