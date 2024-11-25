import React, {useRef} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import PathCard from "@/app/(component)/pathCard";
import Swiper from "react-native-swiper";
import {ArrowLeft, ArrowRight} from "lucide-react-native";
import {Colors} from "@/services/COLORS";



export default function ChooseRoute() {
    const swiperRef = useRef<Swiper>(null);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                <View style={styles.header}>
                    <View style={styles.button}>
                        <ArrowLeft size={30} color={Colors.orange_fonce}/>
                    </View>

                    <Text style={styles.title}>Choose Your Path</Text>
                </View>

                <Swiper
                    ref={swiperRef}
                    style={styles.swiper}
                    showsButtons={false}
                    loop={true}
                    index={1}
                >
                    <PathCard/>
                    <PathCard/>
                    <PathCard/>
                </Swiper>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => swiperRef.current?.scrollBy(-1)} style={styles.button}>
                        <ArrowLeft size={30} color={Colors.bleu_fonce} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => swiperRef.current?.scrollBy(1)} style={styles.button}>
                        <ArrowRight size={30} color={Colors.bleu_fonce} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

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
        marginLeft: 10,
        color: Colors.orange_fonce
    },
    swiper: {
        flex: 1,
    },
    buttonWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: Colors.gris_fonce,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    }
});

