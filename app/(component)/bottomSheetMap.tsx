import React, {useEffect, useState, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import SearchBar from "@/app/(component)/search";


export default function BottomSheetMap({ onPlaceSelected }: { onPlaceSelected: (location: { latitude: number; longitude: number }) => void }) {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const [searchQuery, setSearchQuery] = useState('');

    const updateSearch = (searchQuery: string) : void => setSearchQuery(searchQuery);

    return (

            <GestureHandlerRootView style={styles.container}>
                <BottomSheet
                    ref={bottomSheetRef}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <SearchBar/>

                    </BottomSheetView>
                </BottomSheet>
            </GestureHandlerRootView>

    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    contentContainer: {
        flex: 1,
        width: '100%',
        marginLeft: 10,
    },
});
