import React, { useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import PathCard from "@/app/(component)/pathCard";
import Swiper from "react-native-swiper";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { Colors } from "@/services/COLORS";

export default function ChooseRoute() {
    const swiperRef = useRef<Swiper>(null);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.button}>
                        <ArrowLeft size={30} color={Colors.orange_fonce} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Choose Your Path</Text>
                    <View style={styles.placeholder} />
                </View>

                <Swiper
                    ref={swiperRef}
                    style={styles.swiper}
                    showsButtons={false}
                    loop={true}
                    index={1}
                    showsPagination={false}
                >
                    <PathCard />
                    <PathCard />
                    <PathCard />

                </Swiper>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => swiperRef.current?.scrollBy(-1)} style={styles.button}>
                        <ArrowLeft size={30} color={Colors.bleu_fonce} />
                    </TouchableOpacity>

                    <TouchableOpacity  style={{
                        ...styles.button,
                        padding: 15,
                        backgroundColor: Colors.bleu_clair,
                    }}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>Save for later</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => swiperRef.current?.scrollBy(1)} style={styles.button}>
                        <ArrowRight size={30} color={Colors.bleu_fonce} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.orange_fonce,
    },
    swiper: {
        flex: 1,
    },
    footer: {
        alignItems: 'center',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginBottom: 20,
    },
    button: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: Colors.gris_fonce,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    placeholder: {
        width: 50, // Match the width of the button
    },
});

