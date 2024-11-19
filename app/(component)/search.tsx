import React, {useState} from "react";
import {StyleSheet,  View} from "react-native";
import 'react-native-get-random-values';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function SearchBar() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View>
            <GooglePlacesAutocomplete
                placeholder="Search"
                onPress={(data, details = null) => {
                    // Handle the selected place
                    console.log(data, details);
                }}
                query={{
                    key: 'AIzaSyCgAMWlehBMJg2zErSyuFgnocn7t2cEqgI',
                    language: 'en',
                }}
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
