import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PlanRoute() {
  const [steps, setSteps] = useState(1000);
  const [scenery, setScenery] = useState<string | null>(null);
  const [routeType, setRouteType] = useState<string | null>(null);

  const incrementSteps = () => setSteps((prev) => Math.min(prev + 1000, 10000));
  const decrementSteps = () => setSteps((prev) => Math.max(prev - 1000, 1000));

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
                
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton}>
                <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Plan your Route</Text>
            </View>

            {/* Step Selector */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Set your step</Text>
                <View style={styles.row}>
                <TouchableOpacity style={styles.iconButton} onPress={decrementSteps}>
                    <Icon name="remove" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.stepsText}>{steps}</Text>
                <TouchableOpacity style={styles.iconButton} onPress={incrementSteps}>
                    <Icon name="add" size={24} color="#000" />
                </TouchableOpacity>
                </View>
            </View>

            {/* Scenery Options */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Scenery</Text>
                <View style={styles.row}>
                {['Nature', 'Urban', 'Waterfront'].map((option) => (
                    <TouchableOpacity
                    key={option}
                    style={[
                        styles.optionButton,
                        scenery === option && styles.selectedOption,
                    ]}
                    onPress={() => setScenery(option)}
                    >
                    <Text style={scenery === option ? styles.selectedText : styles.optionText}>
                        {option}
                    </Text>
                    </TouchableOpacity>
                ))}
                </View>
            </View>

            {/* Route Type Options */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Route type</Text>
                <View style={styles.row}>
                {['Loop', 'One-way'].map((option) => (
                    <TouchableOpacity
                    key={option}
                    style={[
                        styles.optionButton,
                        routeType === option && styles.selectedOption,
                    ]}
                    onPress={() => setRouteType(option)}
                    >
                    <Text style={routeType === option ? styles.selectedText : styles.optionText}>
                        {option}
                    </Text>
                    </TouchableOpacity>
                ))}
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.row}>
                <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.outlineButton]}>
                <Text style={styles.outlineButtonText}>Skip</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
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
    fontWeight: 'bold',
  },
  optionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    fontSize: 16,
    color: '#fff',
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  outlineButton: {
    backgroundColor: '#f0f0f0',
  },
  outlineButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});
