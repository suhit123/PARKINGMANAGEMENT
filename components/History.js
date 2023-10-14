import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const blockWidthPercentage = 92;
const History = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [bookings, setBookings] = useState([]);
    const markedDates = {
        [selectedDate]: { selected: true, selectedColor: 'lightblue' },
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString);
    };

    return (
        <View>
            <Calendar
                onDayPress={(day) => handleDateSelect(day)}
                markedDates={markedDates}
            />
            <Text style={styles.heading}>History</Text>
            {bookings.length === 0 ? (
                <View style={styles.empty_div}>
                    <Image
                        resizeMode="contain"
                        style={styles.imagesempty}
                        source={require('../assets/empty.png')}
                    />
                </View>
            ) : (
                <ScrollView style={styles.scrollView}>
                    {bookings.map((item, index) => (
                        <View style={styles.history_block} key={index}>
                            <Image
                                style={styles.images__}
                                resizeMode="contain"
                                source={require('../assets/car.png')}
                            />
                            <View style={styles.details}>
                                <Text style={styles.details_text}>Booking ID :</Text>
                                <Text style={styles.details_text}>Driver :</Text>
                                <Text style={styles.details_text}>Vehicel Number :</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    empty_div: {
        alignItems: 'center',
    },
    imagesempty: {
        width: 200,
        height: 200,
    },
    scrollView: {
        // Add a height to the ScrollView, for example:
        height: 300,
    },
    history_block: {
        width: (windowWidth * blockWidthPercentage) / 100,
        height: 100,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:10
    },
    images__:{
        width:70,
        height:70
    },
    details:{
        marginLeft:20,
    },
    details_text:{
        fontSize:15,
        margin:2
    }
});

export default History;
