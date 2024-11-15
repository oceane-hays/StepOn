import React, { useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import Post from './post'

export default function Discover() {
    const swiper = useRef();

    return (
        <View style={styles.picker}>
            <Swiper
                showsButtons={false}
                index={1}
                loop={true}
            >
                <View style={styles.slide}>
                    <Post location='Central Park, NY'
                          name='John Doe'
                          steps={5234}
                          time={94}
                          image={require('../../assets/images/Logo.png')}
                    />
                </View>
                <View style={styles.slide}>
                    <Post location='Golden Gate Bridge, CA'
                          name='Jane Smith'
                          steps={6782}
                          time={120}
                          image={require('../../assets/images/Logo.png')}
                    />
                </View>
                <View style={styles.slide}>
                    <Post location='Eiffel Tower, Paris'
                          name='Emily Johnson'
                          steps={4321}
                          time={85}
                          image={require('../../assets/images/Logo.png')}
                    />
                </View>
                {/* Add more slides as needed */}
            </Swiper>
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
    slide: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
})
