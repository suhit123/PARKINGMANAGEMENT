import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import RazorpayCheckout from 'react-native-razorpay';
const Dashboard = () => {
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [driverName, setDriverName] = useState('');
    const [stage, setStage] = useState(1);
    const handleSelectVehicleType = (type) => {
        setVehicleType(type);
    };

    //date
    const [selected, setSelected] = useState('');
    const today = new Date();
    const nextThreeDays = [];
    for (let i = 0; i < 1; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        nextThreeDays.push(date.toISOString().split('T')[0]);
    }

    const markedDates = {
        [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
    };

    for (let date in nextThreeDays) {
        markedDates[date] = {
            selected: true,
            disableTouchEvent: false,
            selectedDotColor: 'orange',
        };
    }
    //time
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const timeSlots = [];
    for (let i = 0; i < 24 * 2; i++) {
        const hours = Math.floor(i / 2);
        const minutes = i % 2 === 0 ? '00' : '30';
        const time = `${hours}:${minutes}`;
        timeSlots.push(time);
    }
    const handleStartTimeChange = (value) => {
        setStartTime(value);
    };
    const handleEndTimeChange = (value) => {
        setEndTime(value);
    };
    const [endTimes, setEndTimes] = useState([]);
    useEffect(() => {
        console.log("hi")
        setEndTimes(timeSlots.slice(
            timeSlots.findIndex((time) => time === startTime) + 1
        ));
    }, [startTime])
    const [timeline, setTimeline] = useState(
        {
            "0:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "0:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "1:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "1:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "2:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "2:30": [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "3:00": [2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            "3:30": [2, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            "4:00": [2, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            "4:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "5:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "5:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "6:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "6:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "8:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "8:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "9:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "9:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "10:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "10:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "11:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "11:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "12:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "12:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "13:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "13:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "14:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "14:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "15:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "15:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "16:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "16:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "17:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "17:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "18:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "18:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "19:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "19:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "20:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "20:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "21:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "21:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "22:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "22:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "23:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "23:30": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "24:00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
    )
    let amount = 1000;
    const [isSlotAvailable, setIsSlotAvailable] = useState(["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty"]);
    const checkSlotAvailabilityForAllVehicles = () => {
        for (let vehicleIndex = 0; vehicleIndex < 10; vehicleIndex++) {
            const selectedStartTime = startTime;
            const selectedEndTime = endTime;
            console.log(selectedStartTime + " " + selectedEndTime)
            const selectedTimeSlots = timeSlots.slice(
                timeSlots.indexOf(selectedStartTime),
                timeSlots.indexOf(selectedEndTime) + 1
            );
            console.log(selectedTimeSlots)
            let isAvailable = "Empty"; // Initialize to true
            for (const i of selectedTimeSlots) {
                const slot = timeline[i];
                if (slot[vehicleIndex] === 2) {
                    isAvailable = "Filled";
                    break;
                }
                else if (slot[vehicleIndex] === 1) {
                    isAvailable = "Booked";
                    break;
                }
            }
            setIsSlotAvailable((prev) => {
                const updatedIsSlotAvailable = [...prev];
                updatedIsSlotAvailable[vehicleIndex] = isAvailable;
                return updatedIsSlotAvailable;
            });
        }
        console.log(isSlotAvailable)
    };
    useEffect(() => {
        checkSlotAvailabilityForAllVehicles();
    }, [endTime])
    const [slotId, setSlotId] = useState(0);
    return (
        <View>
            {stage === 1 ? <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.heading}>Select Vehicle Type:</Text>
                    <View style={styles.grid}>
                        <View style={vehicleType === 'Two-Wheeler' ? styles.divisionStyled : styles.division}>
                            <TouchableOpacity onPress={() => handleSelectVehicleType('Two-Wheeler')}>
                                <Image resizeMode="contain" style={styles.images} source={require('../assets/bike.png')} />
                                <Text style={vehicleType === 'Two-Wheeler' ? styles.selectedType : styles.vehicleType}>
                                    Two-Wheeler
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={vehicleType === 'Four-Wheeler' ? styles.divisionStyled : styles.division}>
                            <TouchableOpacity onPress={() => handleSelectVehicleType('Four-Wheeler')}>
                                <Image resizeMode="contain" style={styles.images} source={require('../assets/car.png')} />
                                <Text style={vehicleType === 'Four-Wheeler' ? styles.selectedType : styles.vehicleType}>
                                    Four-Wheeler
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={vehicleType === 'Semi' ? styles.divisionStyled : styles.division}>
                            <TouchableOpacity onPress={() => handleSelectVehicleType('Semi')}>
                                <Image resizeMode="contain" style={styles.images} source={require('../assets/semi.png')} />
                                <Text style={vehicleType === 'Semi' ? styles.selectedType : styles.vehicleType}>
                                    Semi
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.division2}>
                        <TextInput
                            style={styles.input}
                            placeholder="Vehicle Number"
                            value={vehicleNumber}
                            onChangeText={(text) => setVehicleNumber(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Driver Name"
                            value={driverName}
                            onChangeText={(text) => setDriverName(text)}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => {
                            if (vehicleNumber !== '' && driverName !== '' && vehicleType !== '') { // Check if both fields have data
                                setStage(2); // Move to the next stage
                            } else {
                                // Show an error message or prevent the action in some way
                                // You can display an alert, set an error state, or show a message to the user
                                alert("Please select & enter all the fields.");
                            }
                        }}
                    >
                        <Text style={styles.submitButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView> : stage === 2 ? <>
                <ScrollView><Calendar onDayPress={(day) => {
                    if (nextThreeDays.includes(day.dateString)) {
                        setSelected(day.dateString)
                    }
                }} markedDates={markedDates} />
                    <View style={styles.container_time}>
                        <View style={styles.container_time_}>
                            <Text style={styles.label_time}>Select Start Time:</Text>
                            <Picker
                                selectedValue={startTime}
                                onValueChange={handleStartTimeChange}>
                                {timeSlots.map((time, index) => (
                                    <Picker.Item key={index} label={time} value={time} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.container_time_}>
                            <Text style={styles.label_time}>Select End Time:</Text>
                            <Picker
                                selectedValue={endTime}
                                onValueChange={handleEndTimeChange}>
                                {endTimes.map((time, index) => (
                                    <Picker.Item key={index} label={time} value={time} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonCalender} onPress={() => {
                        if (selected !== '' && startTime && endTime) {
                            setStage(3)
                            checkSlotAvailabilityForAllVehicles();
                        } else {
                            alert("Please select date & choose duration.");
                        }
                    }}>
                        <Text style={styles.signupButtonTextCalender}>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCalenderBack} onPress={() => { setStage(1) }}>
                        <Text style={styles.signupButtonTextCalenderBack}>Back</Text>
                    </TouchableOpacity>
                </ScrollView>
            </> : stage === 3 ?
                <ScrollView>
                    <View style={styles.container_slot}>
                        <Text style={styles.slot_heading}>Select your parking slot</Text>
                        <View style={styles.legendContainer}>
                            <View style={[styles.legendItem, styles.availableColor]} />
                            <Text style={styles.legendText}>Available</Text>

                            <View style={[styles.legendItem, styles.filledColor]} />
                            <Text style={styles.legendText}>Filled</Text>

                            <View style={[styles.legendItem, styles.reservedColor]} />
                            <Text style={styles.legendText}>Reserved</Text>

                        </View>
                        <ImageBackground style={styles.backimage_slot} source={require('../assets/background_1.png')} resizeMode="cover">
                            <View style={styles.left_div}>
                                {isSlotAvailable[0] === "Empty" && vehicleType === "Semi" ?
                                    <TouchableOpacity onPress={() => { setSlotId(1) }}>
                                        <View style={[slotId === 1 ? styles.highlight : styles.default, isSlotAvailable[0] === "Empty" ? styles.border_green : isSlotAvailable[0] === "Filled" ? styles.border_red : styles.border_yellow]}>
                                            <Image resizeMode="contain" style={[styles.v1, vehicleType === "Two-Wheeler" || vehicleType === "Four-Wheeler" ? styles.disable : styles.enable]} source={require('../assets/semi_.png')} />
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <View style={isSlotAvailable[0] === "Empty" ? styles.border_green : isSlotAvailable[0] === "Filled" ? styles.border_red : styles.border_yellow}>
                                        <Image resizeMode="contain" style={[styles.v1, vehicleType === "Two-Wheeler" || vehicleType === "Four-Wheeler" ? styles.disable : styles.enable]} source={require('../assets/semi_.png')} />
                                    </View>
                                }
                                {isSlotAvailable[1] === "Empty" && vehicleType === "Four-Wheeler" ?
                                    <TouchableOpacity onPress={() => { setSlotId(2) }}>
                                        <View style={[slotId === 2 ? styles.highlight : styles.default, isSlotAvailable[1] === "Empty" ? styles.border_green : isSlotAvailable[1] === "Filled" ? styles.border_red : styles.border_yellow]}>
                                            <Image resizeMode="contain" style={[styles.v2, vehicleType === "Two-Wheeler" || vehicleType === "Semi" ? styles.disable : styles.enable]} source={require('../assets/car_.png')} />
                                        </View>
                                    </TouchableOpacity> :
                                    <View style={isSlotAvailable[1] === "Empty" ? styles.border_green : isSlotAvailable[1] === "Filled" ? styles.border_red : styles.border_yellow}>
                                        <Image resizeMode="contain" style={[styles.v2, vehicleType === "Two-Wheeler" || vehicleType === "Semi" ? styles.disable : styles.enable]} source={require('../assets/car_.png')} />
                                    </View>
                                }
                                {isSlotAvailable[2] === "Empty" && vehicleType === "Four-Wheeler" ?
                                    <TouchableOpacity onPress={() => { setSlotId(3) }}>
                                        <View style={[slotId === 3 ? styles.highlight : styles.default, isSlotAvailable[2] === "Empty" ? styles.border_green : isSlotAvailable[2] === "Filled" ? styles.border_red : styles.border_yellow]}>
                                            <Image resizeMode="contain" style={[styles.v3, vehicleType === "Two-Wheeler" || vehicleType === "Semi" ? styles.disable : styles.enable]} source={require('../assets/car_.png')} />
                                        </View>
                                    </TouchableOpacity> :
                                    <View style={isSlotAvailable[2] === "Empty" ? styles.border_green : isSlotAvailable[2] === "Filled" ? styles.border_red : styles.border_yellow}>
                                        <Image resizeMode="contain" style={[styles.v3, vehicleType === "Two-Wheeler" || vehicleType === "Semi" ? styles.disable : styles.enable]} source={require('../assets/car_.png')} />
                                    </View>
                                }
                                {isSlotAvailable[3] === "Empty" && vehicleType === "Four-Wheeler" ?
                                    <TouchableOpacity onPress={() => { setSlotId(4) }}>
                                        <View style={[slotId === 4 ? styles.highlight : styles.default, isSlotAvailable[3] === "Empty" ? styles.border_green : isSlotAvailable[3] === "Filled" ? styles.border_red : styles.border_yellow]}>
                                            <Image resizeMode="contain" style={[styles.v4, vehicleType === "Two-Wheeler" || vehicleType === "Semi" ? styles.disable : styles.enable]} source={require('../assets/car_.png')} />
                                        </View>
                                    </TouchableOpacity> :
                                    <View style={isSlotAvailable[3] === "Empty" ? styles.border_green : isSlotAvailable[3] === "Filled" ? styles.border_red : styles.border_yellow}>
                                        <Image resizeMode="contain" style={[styles.v4, vehicleType === "Two-Wheeler" || vehicleType === "Semi" ? styles.disable : styles.enable]} source={require('../assets/car_.png')} />
                                    </View>
                                }
                                {isSlotAvailable[4] === "Empty" && vehicleType === "Two-Wheeler" ?
                                    <TouchableOpacity onPress={() => { setSlotId(5) }}>
                                        <View style={[slotId === 5 ? styles.highlight : styles.default, isSlotAvailable[4] === "Empty" ? styles.border_green : isSlotAvailable[4] === "Filled" ? styles.border_red : styles.border_yellow]}>
                                            <Image resizeMode="contain" style={[styles.v5, vehicleType === "Semi" || vehicleType === "Four-Wheeler" ? styles.disable : styles.enable]} source={require('../assets/bike_.png')} />
                                        </View>
                                    </TouchableOpacity> :
                                    <View style={isSlotAvailable[4] === "Empty" ? styles.border_green : isSlotAvailable[4] === "Filled" ? styles.border_red : styles.border_yellow}>
                                        <Image resizeMode="contain" style={[styles.v5, vehicleType === "Semi" || vehicleType === "Four-Wheeler" ? styles.disable : styles.enable]} source={require('../assets/bike_.png')} />
                                    </View>
                                }
                            </View>
                            <View style={styles.right_div}>
                                {isSlotAvailable[5] === "Empty" && vehicleType === "Semi" ?
                                    <TouchableOpacity onPress={() => { setSlotId(6) }}>
                                        <View style={[slotId === 6 ? styles.highlight : styles.default, isSlotAvailable[5] === "Empty" ? styles.border_green : isSlotAvailable[5] === "Filled" ? styles.border_red : styles.border_yellow]}>
                                            <Image resizeMode="contain" style={[styles.v6, vehicleType === "Two-Wheeler" || vehicleType === "Four-Wheeler" ? styles.disable : styles.enable]} source={require('../assets/semi__.png')} />
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <View style={isSlotAvailable[5] === "Empty" ? styles.border_green : isSlotAvailable[5] === "Filled" ? styles.border_red : styles.border_yellow}>
                                        <Image resizeMode="contain" style={[styles.v6, vehicleType === "Two-Wheeler" || vehicleType === "Four-Wheeler" ? styles.disable : styles.enable]} source={require('../assets/semi__.png')} />
                                    </View>
                                }
                                {isSlotAvailable[6] === "Empty" && vehicleType === "Four-Wheeler" ?
                                    <TouchableOpacity onPress={() => { setSlotId(7) }}>
                                        <View style={[slotId === 7 ? styles.highlight : styles.default, isSlotAvailable[6] === "Empty" ? styles.border_green : isSlotAvailable[6] === "Filled" ? styles.border_red : styles.border_yellow]}>
                                            <Image resizeMode="contain" style={[styles.v7, vehicleType === "Two-Wheeler" || vehicleType === "Semi" ? styles.disable : styles.enable]} source={require('../assets/car__.png')} />
                                        </View>
                                    </TouchableOpacity> :
                                    <View style={isSlotAvailable[6] === "Empty" ? styles.border_green : isSlotAvailable[6] === "Filled" ? styles.border_red : styles.border_yellow}>
                                        <Image resizeMode="contain" style={[styles.v7, vehicleType === "Two-Wheeler" || vehicleType === "Semi" ? styles.disable : styles.enable]} source={require('../assets/car__.png')} />
                                    </View>
                                }
                                {isSlotAvailable[7] === "Empty" && vehicleType === "Four-Wheeler" ?
                                    <TouchableOpacity onPress={() => { setSlotId(8) }}>
                                        <View style={[slotId === 8 ? styles.highlight : styles.default, isSlotAvailable[7] === "Empty" ? styles.border_green : isSlotAvailable[7] === "Filled" ? styles.border_red : styles.border_yellow]}>
                                            <Image resizeMode="contain" style={[styles.v8, vehicleType === "Two-Wheeler" || vehicleType === "Semi" ? styles.disable : styles.enable]} source={require('../assets/car__.png')} />
                                        </View>
                                    </TouchableOpacity> :
                                    <View style={isSlotAvailable[7] === "Empty" ? styles.border_green : isSlotAvailable[7] === "Filled" ? styles.border_red : styles.border_yellow}>
                                        <Image resizeMode="contain" style={[styles.v8, vehicleType === "Two-Wheeler" || vehicleType === "Semi" ? styles.disable : styles.enable]} source={require('../assets/car__.png')} />
                                    </View>
                                }
                                {isSlotAvailable[8] === "Empty" && vehicleType === "Four-Wheeler" ?
                                    <TouchableOpacity onPress={() => { setSlotId(9) }}>
                                        <View style={[slotId === 9 ? styles.highlight : styles.default, isSlotAvailable[8] === "Empty" ? styles.border_green : isSlotAvailable[8] === "Filled" ? styles.border_red : styles.border_yellow]}>
                                            <Image resizeMode="contain" style={[styles.v9, vehicleType === "Two-Wheeler" || vehicleType === "Semi" ? styles.disable : styles.enable]} source={require('../assets/car__.png')} />
                                        </View>
                                    </TouchableOpacity> :
                                    <View style={isSlotAvailable[8] === "Empty" ? styles.border_green : isSlotAvailable[8] === "Filled" ? styles.border_red : styles.border_yellow}>
                                        <Image resizeMode="contain" style={[styles.v9, vehicleType === "Two-Wheeler" || vehicleType === "Semi" ? styles.disable : styles.enable]} source={require('../assets/car__.png')} />
                                    </View>
                                }
                                {isSlotAvailable[9] === "Empty" && vehicleType === "Two-Wheeler" ?
                                    <TouchableOpacity onPress={() => { setSlotId(10) }}>
                                        <View style={[slotId === 10 ? styles.highlight : styles.default, isSlotAvailable[9] === "Empty" ? styles.border_green : isSlotAvailable[9] === "Filled" ? styles.border_red : styles.border_yellow]}>
                                            <Image resizeMode="contain" style={[styles.v10, vehicleType === "Semi" || vehicleType === "Four-Wheeler" ? styles.disable : styles.enable]} source={require('../assets/bike__.png')} />
                                        </View>
                                    </TouchableOpacity> :
                                    <View style={isSlotAvailable[9] === "Empty" ? styles.border_green : isSlotAvailable[9] === "Filled" ? styles.border_red : styles.border_yellow}>
                                        <Image resizeMode="contain" style={[styles.v10, vehicleType === "Semi" || vehicleType === "Four-Wheeler" ? styles.disable : styles.enable]} source={require('../assets/bike__.png')} />
                                    </View>
                                }
                            </View>
                        </ImageBackground>
                        <TouchableOpacity style={styles.submitButton} onPress={() => {
                            if (slotId !== 0) {
                                setStage(4)
                            }
                            else {
                                alert("Please select a slot.");
                            }
                        }}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCalenderBack} onPress={() => { setStage(2) }}>
                            <Text style={styles.signupButtonTextCalenderBack}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView> : <>
                    <View style={styles.details_container}>
                        <View>
                            <Text style={styles.details_heading}>Vehicle Type:</Text>
                            <Text style={styles.details_heading}>Driver Name:</Text>
                            <Text style={styles.details_heading}>Vehicle Number:</Text>
                            <Text style={styles.details_heading}>Date:</Text>
                            <Text style={styles.details_heading}>Time:</Text>
                            <Text style={styles.details_heading}>Slot:</Text>
                            <Text style={styles.details_heading}>Amount:</Text>
                        </View>
                        <View>
                            <Text style={styles.details_value}>{vehicleType}</Text>
                            <Text style={styles.details_value}>{driverName}</Text>
                            <Text style={styles.details_value}>{vehicleNumber}</Text>
                            <Text style={styles.details_value}>{selected}</Text>
                            <Text style={styles.details_value}>{startTime} - {endTime}</Text>
                            <Text style={styles.details_value}>{slotId}</Text>
                            <Text style={styles.details_value}>{amount}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.details_button} onPress={() => {
                        var options = {
                            description: 'Credits towards consultation',
                            image: 'https://i.imgur.com/3g7nmJC.png',
                            currency: 'INR',
                            key: 'rzp_test_P4936ySdvNy851', // Your api key
                            amount: '5000',
                            name: 'foo',
                            prefill: {
                                email: 'void@razorpay.com',
                                contact: '9191919191',
                                name: 'Razorpay Software'
                            },
                            theme: { color: '#F37254' }
                        }
                        RazorpayCheckout.open(options).then((data) => {
                            // handle success
                            alert(`Success: ${data.razorpay_payment_id}`);
                        }).catch((error) => {
                            // handle failure
                            alert(`Error: ${error.code} | ${error.description}`);
                        });
                    }}>
                        <Text style={styles.signupdetails_ButtonText}>Proceed to pay</Text>
                    </TouchableOpacity>
                </>}
        </View>
    );
};

const styles = StyleSheet.create({
    legendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendItem: {
        width: 15,
        height: 15,
        marginRight: 5,
        marginLeft: 10,
    },
    legendText: {
        fontSize: 14,
        marginRight: 10,
    },
    reservedColor: {
        backgroundColor: 'gold',
        borderRadius: 50
    },
    filledColor: {
        backgroundColor: 'darkred',
        borderRadius: 50
    },
    availableColor: {
        backgroundColor: 'green',
        borderRadius: 50
    },
    border_green: {
        borderBottomWidth: 3,
        borderBottomColor: 'green'
    }, border_yellow: {
        borderBottomWidth: 3,
        borderBottomColor: 'gold'
    }, border_red: {
        borderBottomWidth: 3,
        borderBottomColor: 'red'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10
    },
    division: {
        width: '48%', // Set the width to 48% to display 2 divisions in a row with a small gap.
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center',
    },
    divisionStyled: {
        width: '48%', // Set the width to 48% to display 2 divisions in a row with a small gap.
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(57, 157, 188, 0.36)'
    },
    division2: {
        margin: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
    },
    vehicleType: {
        fontSize: 16,
        padding: 5,
        textAlign: 'center'
    },
    selectedType: {
        fontSize: 16,
        padding: 5,
        backgroundColor: 'lightblue',
        borderRadius: 5,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width: '100%',
        marginTop: 10,
    },
    images: {
        width: 100,
        height: 100,
    },
    submitButton: {
        margin: 10,
        backgroundColor: '#0995d6',
        padding: 15,
        borderRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14
    },
    time_sec: {
        padding: 10
    },
    container_time: {
        padding: 10,
    },
    label_time: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    buttonCalender: {
        margin: 10,
        backgroundColor: '#0995d6',
        padding: 15,
        borderRadius: 5,
    },
    signupButtonTextCalender: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonCalenderBack: {
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5,
    }, signupButtonTextCalenderBack: {
        color: '#0995d6',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    container_time_: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
    },
    container_slot: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    },
    backimage_slot: {
        margin: 0,
        height: 420,
    },
    slot_data: {
        padding: 10,
    },
    slot_heading: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        marginTop: 27,
    }, slot_description: {
        fontSize: 17,
        margin: 10,
    },
    v1: {
        width: 100,
        height: 80
    },
    v2: {
        width: 100,
        height: 75,
    },
    v3: {
        width: 100,
        height: 75
    },
    v4: {
        width: 100,
        height: 75
    },
    v5: {
        width: 100,
        height: 70
    },
    v6: {
        width: 100,
        height: 80
    },

    v7: {
        width: 100,
        height: 75
    }, v8: {
        width: 100,
        height: 75
    }, v9: {
        width: 100,
        height: 75
    }, v10: {
        width: 100,
        height: 70
    },
    left_div: {
        position: 'absolute',
        left: 25,
        top: 20
    },
    right_div: {
        position: 'absolute',
        right: 25,
        top: 20
    },
    disable: {
        opacity: 0.3,
    },
    enable: {

    },
    highlight: {
        backgroundColor: 'rgba(53, 237, 53, 0.1)'
    }, details_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    details_heading: {
        fontWeight: 'bold',
        margin: 10,
        fontSize: 16,
    },
    details_value: {
        fontSize: 16,
        margin: 10,
    },
    details_button: {
        backgroundColor: '#0995d6',
        padding: 10,
        margin: 15,
        borderRadius: 5,
    },
    signupdetails_ButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    }
});

export default Dashboard;
