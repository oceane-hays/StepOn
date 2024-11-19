import React, {useEffect, useState, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { SearchBar } from 'react-native-elements';


export default function BottomSheetMap() {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const [search, setSearch] = useState("");

    const updateSearch = (search : string) : void => {
        setSearch(search);
    };


    return (

            <GestureHandlerRootView style={styles.container}>
                <BottomSheet
                    ref={bottomSheetRef}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView style={styles.contentContainer}>

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
        padding: 36,
        alignItems: 'center',
    },
});
