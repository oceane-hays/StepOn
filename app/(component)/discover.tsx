import React, { useRef } from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import Swiper from 'react-native-swiper'
import Post from './post'

export default function Discover() {
    const swiper = useRef();

    return (
        <View style={styles.picker}>
            <ScrollView>
                <Post location='Central Park, NY'
                      name='John Doe'
                      steps={5234}
                      time={94}
                      image={require('../../assets/images/testMap.png')}
                />


                <Post location='Golden Gate Bridge, CA'
                      name='Jane Smith'
                      steps={6782}
                      time={120}
                      image={require('../../assets/images/testMap.png')}
                />


                <Post location='Eiffel Tower, Paris'
                      name='Emily Johnson'
                      steps={4321}
                      time={85}
                      image={require('../../assets/images/testMap.png')}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    picker: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
    },
})
