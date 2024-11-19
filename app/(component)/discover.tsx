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
})
