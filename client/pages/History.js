import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    TouchableOpacity,
    ImageBackground,
    TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../utility/Theme';
import { getHistory } from '../utility/Tracker';

const History = ({ navigation }) => {
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [historyData, setHistoryData] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [latLongValues, setLatLongValues] = useState([]);
    const { themeColors, backgroundImages } = useTheme();


    const handleCloseModal = () => {
        setPopupVisibility(false);
    };

    const handleStartDateChange = (event, selectedDate) => {
        setShowStartDatePicker(false);
        if (selectedDate) {
            setStartDate(selectedDate);

            let newEndDate = new Date(selectedDate);
            newEndDate.setDate(selectedDate.getDate() + 1);

            setEndDate(newEndDate);
        }
    };


    const getHistoryData = async () => {
        try {
            const data = await getHistory(startDate, endDate);
            setHistoryData(data);
            const values = {
                latLong: data.map(entry => entry.latlong.reverse()),
                time: data.map(entry => new Date(entry.time * 1000).toLocaleTimeString('en-US', { hour12: false })),
                speed: data.map(entry => entry.speed),
            };
            setLatLongValues(values);
            console.log("coordinates: ", latLongValues);
        } catch (error) {
            console.error('Error while getting history: ' + error);
        }
    };


    return (
        <ImageBackground
            source={backgroundImages.backgroundImage}
            style={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.upperHalf}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Select Date</Text>
                        <TextInput
                            style={[styles.text, styles.input]}
                            placeholder="Select Date"
                            value={startDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            onFocus={() => setShowStartDatePicker(true)}
                        />

                        <TouchableOpacity onPress={getHistoryData}>
                            <Text
                                style={[
                                    styles.buttonTextForModal,
                                    { color: themeColors.textColor, borderColor: themeColors.textColor, textAlign: 'center' },
                                ]}
                            >
                                Get History Data
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isPopupVisible}
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.popup}>
                        <>
                            <TextInput
                                style={[styles.text, styles.input]}
                                placeholder="Select Date"
                                value={startDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                onFocus={() => setShowStartDatePicker(true)}
                            />

                            <TouchableOpacity onPress={handleCloseModal}>
                                <Text
                                    style={[
                                        styles.buttonTextForCloseModal,
                                        { color: themeColors.textColor, borderColor: themeColors.textColor },
                                    ]}
                                >
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </>
                    </View>
                </Modal>

                {showStartDatePicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={handleStartDateChange}
                        style={{ color: themeColors.textColor }}
                    />
                )}

                {historyData && (
                    <View style={styles.statsContainer}>
                        <Text style={[styles.text, { color: themeColors.textColor, marginTop: 20 }]}>
                            Number of Data Points: {historyData.length}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Home', { latLongValues })}>
                            <Text
                                style={[
                                    styles.buttonTextForCloseModal,
                                    { color: themeColors.textColor, borderColor: themeColors.textColor },
                                ]}
                            >
                                Show on map
                            </Text>
                        </TouchableOpacity>

                    </View>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
    },
    upperHalf: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderRadius: 30,
        width: 350,
        marginTop: 50,
    },
    cardTitle: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    statsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        color: '#FFFFFF',
    },
    popup: {
        alignItems: 'center',
        borderRadius: 10,
        width: 300,
        height: 400,
        marginTop: 70,
        marginLeft: 45,
        backgroundColor: '#858585',
    },
    buttonTextForCloseModal: {
        fontWeight: 'bold',
        top: 28,
        borderRadius: 5,
        borderWidth: 1,
        padding: 3,
    },
    buttonTextForModal: {
        fontWeight: 'bold',
        top: 10,
        borderRadius: 10,
        borderWidth: 1,
        padding: 3,
        marginTop: 20,
        justifyContent: 'center',
    },
});

export default History;
