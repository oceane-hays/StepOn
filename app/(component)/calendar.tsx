import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window');


export default function Calendar() {
    const swiper = useRef();
    const [value, setValue] = useState(new Date());
    const [week, setWeek] = useState(0);

    const weeks = React.useMemo(() => {
        const start = moment().add(week, 'weeks').startOf('week');

        return [-1, 0, 1].map(adj => {
            return Array.from({ length: 7 }).map((_, index) => {
                const date = moment(start).add(adj, 'week').add(index, 'day');

                return {
                    weekday: date.format('ddd'),
                    date: date.toDate(),
                };
            });
        });
    }, [week]);

    return (

        <View style={styles.picker}>
            <Swiper
                index={1}
                ref={swiper}
                loop={false}
                showsPagination={false}
                onIndexChanged={ind => {
                    if (ind === 1) {
                        return;
                    }
                    setTimeout(() => {
                        const newIndex = ind - 1;
                        const newWeek = week + newIndex;
                        setWeek(newWeek);
                        setValue(moment(value).add(newIndex, 'week').toDate());
                        swiper.current.scrollTo(1, false);
                    }, 100);
                }}>
                {weeks.map((dates, index) => (
                    <View style={styles.itemRow} key={index}>
                        {dates.map((item, dateIndex) => {
                            const isActive =
                                value.toDateString() === item.date.toDateString();
                            return (
                                <TouchableWithoutFeedback
                                    key={dateIndex}
                                    onPress={() => setValue(item.date)}>
                                    <View style={[styles.item, isActive && {
                                        backgroundColor: '#5E83C0',
                                        borderColor: '#111',
                                    }, ]}>

                                        <Text style={[styles.itemWeekday,
                                            isActive && { color: '#fff' },]}>

                                            {item.weekday}
                                        </Text>

                                        <Text style={[styles.itemDate,
                                            isActive && { color: '#fff' },]}>
                                            {item.date.getDate()}
                                        </Text>

                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        })}
                    </View>
                ))}
            </Swiper>
        </View>

    );
}

const styles = StyleSheet.create({
    picker: {
        maxHeight: 74,  // Hauteur maximale définie
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemRow: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    item: {
        flex: 1,
        height: 50,
        marginHorizontal: 4,
        paddingVertical: 6,
        paddingHorizontal: 4,
        borderRadius: 8,
        alignItems: 'center',
    },
    itemWeekday: {
        fontSize: 13,
        fontWeight: '500',
        color: '#737373',
        marginBottom: 4,
    },
    itemDate: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111',
    },
});
