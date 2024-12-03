import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {Colors} from "@/services/COLORS";

const images = {
    Nature: require("./../../assets/images/filterIcon/landscape.png"),
    Urban: require("./../../assets/images/filterIcon/buildings.png"),
    Waterfront: require("./../../assets/images/filterIcon/river.png"),
};

const selectedImages = {
    Nature: require("./../../assets/images/filterIcon/landscapeFill.png"),
    Urban: require("./../../assets/images/filterIcon/buildingsFill.png"),
    Waterfront: require("./../../assets/images/filterIcon/riverFill.png"),
};

interface FilterProps {
    incrementSteps: () => void;
    decrementSteps: () => void;
    steps: number;
    scenery: string | null;
    setScenery: (value: string | null) => void;
    routeType: string | null;
    setRouteType: (value: string | null) => void;

}

const Filter: React.FC<FilterProps> = ({
                                           incrementSteps,
                                           decrementSteps,
                                           steps,
                                           scenery,
                                           setScenery,
                                           routeType,
                                           setRouteType,

                                       }) => {
    return (
        <View>
            {/* Step Selector */}
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

            <View style={styles.divider} />

            {/* Scenery Options */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Scenery</Text>
                <View style={styles.row}>
                    {["Nature", "Urban", "Waterfront"].map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[
                                styles.optionButton,
                                scenery === option && styles.selectedOption,
                            ]}
                            onPress={() => setScenery(option)}
                        >
                            <Image
                                source={scenery === option ? selectedImages[option] : images[option]}
                                style={styles.image}
                                resizeMode="contain"
                            />
                            <Text
                                style={
                                    scenery === option ? styles.selectedText : styles.optionText
                                }
                            >
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}


                </View>
            </View>

            <View style={styles.divider} />

            {/* Route Type Options */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Route type</Text>
                <View style={styles.row}>
                    {["Loop", "One-way"].map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[
                                styles.optionButton,
                                routeType === option && styles.selectedOption,
                            ]}
                            onPress={() => setRouteType(option)}
                        >
                            <Text
                                style={
                                    routeType === option ? styles.selectedText : styles.optionText
                                }
                            >
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

const card = {
    marginHorizontal: 20,
    marginBottom: 30,
}

const styles = StyleSheet.create({
    section: {
        ...card,
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
    divider: {
        height: 1, // Thickness of the line
        backgroundColor: '#ccc', // Gray color
        width: '100%', // Stretch across the screen
        marginVertical: 15, // Space above and below the line
    },
    image: {
        width: 40, // Ajustez selon la taille souhaitée
        height: 40,
    },
});

export default Filter;
