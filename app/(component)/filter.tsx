import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageSourcePropType } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "@/services/COLORS";

const images: { [key: string]: ImageSourcePropType } = {
    Nature: require("./../../assets/images/filterIcon/landscape.png"),
    Urban: require("./../../assets/images/filterIcon/buildings.png"),
    Waterfront: require("./../../assets/images/filterIcon/river.png"),
    Bike: require("./../../assets/images/filterIcon/bike.png"),
    Run: require("./../../assets/images/filterIcon/run.png"),
    Walk: require("./../../assets/images/filterIcon/walk.png"),
};

const selectedImages: { [key: string]: ImageSourcePropType } = {
    Nature: require("./../../assets/images/filterIcon/landscapeFill.png"),
    Urban: require("./../../assets/images/filterIcon/buildingsFill.png"),
    Waterfront: require("./../../assets/images/filterIcon/riverFill.png"),
    Bike: require("./../../assets/images/filterIcon/bikeColor.png"),
    Run: require("./../../assets/images/filterIcon/runColor.png"),
    Walk: require("./../../assets/images/filterIcon/walkColor.png"),
};

interface FilterProps {
    incrementSteps: () => void;
    decrementSteps: () => void;
    steps: number;
    scenery: string | null;
    transport: string | null;
    setScenery: (value: string | null) => void;
    routeType: string | null;
    setRouteType: (value: string | null) => void;
    setRouteTransport: (value: string | null) => void;
}

const Filter: React.FC<FilterProps> = ({
                                           incrementSteps,
                                           decrementSteps,
                                           steps,
                                           scenery,
                                           setScenery,
                                           routeType,
                                           setRouteType,
                                           transport,
                                           setRouteTransport,
                                       }) => {


    const renderOption = useMemo(() => (
        option: string,
        selectedValue: string | null,
        onPress: (value: string | null) => void,
        useImage: boolean = false
    ) => (
        <TouchableOpacity
            key={option}
            style={[
                styles.optionButton,
                selectedValue === option && styles.selectedOption,
            ]}
            onPress={() => onPress(selectedValue === option ? null : option)}
        >
            {useImage && (
                <Image
                    source={selectedValue === option ? selectedImages[option] : images[option]}
                    style={styles.image}
                    resizeMode="contain"
                />
            )}
            <Text
                style={
                    selectedValue === option ? styles.selectedText : styles.optionText
                }
            >
                {option}
            </Text>
        </TouchableOpacity>
    ), []);

    return (
        <View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Set your steps</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.iconButton} onPress={decrementSteps}>
                        <Icon name="remove" size={24} color={Colors.orange_fonce} />
                    </TouchableOpacity>
                    <Text style={styles.stepsText}>{steps}</Text>
                    <TouchableOpacity style={styles.iconButton} onPress={incrementSteps}>
                        <Icon name="add" size={24} color={Colors.orange_fonce} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Scenery</Text>
                <View style={styles.row}>
                    {["Nature", "Urban", "Waterfront"].map((option) =>
                        renderOption(option, scenery, setScenery, true)
                    )}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Route type</Text>
                <View style={styles.row}>
                    {["Loop", "One-way"].map((option) =>
                        renderOption(option, routeType, setRouteType)
                    )}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Transport</Text>
                <View style={styles.row}>
                    {['Bike', 'Run', 'Walk'].map((option) =>
                        renderOption(option, transport, setRouteTransport, true)
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        color: '#000',
        fontWeight: '600',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    stepsText: {
        fontSize: 24,
        color: Colors.orange_fonce,
        fontWeight: 'bold',
    },
    optionButton: {
        flex: 1,
        padding: 12,
        borderRadius: 20,
        borderColor: Colors.gris_fonce,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: '#fff',
        shadowColor: Colors.gris_fonce,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    optionText: {
        fontSize: 16,
        color: Colors.gris_fonce,
    },
    selectedText: {
        fontSize: 16,
        color: Colors.orange_clair,
    },
    iconButton: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
        marginRight: 12,
    },
    image: {
        width: 40,
        height: 40,
    },
});

export default Filter;

