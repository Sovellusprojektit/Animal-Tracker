import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import { useTheme } from '../utility/Theme';
import { Coordinates } from '../utility/MapData';

const History = ({ navigation }) => {
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const { themeColors, backgroundImages } = useTheme();

    const togglePopup = () => {
        setPopupVisibility(!isPopupVisible);
    };

    const handleCloseModal = () => {
        setPopupVisibility(false);
    };

    const handleViewOnMap = () => {
        const coords = Coordinates();
        console.log("Coordinates to be passed:", coords);
        setPopupVisibility(false);
        navigation.navigate('Home', { coordinates: coords });
      };

    return (
        <ImageBackground source={backgroundImages.backgroundImage} style={styles.container}>
            <View style={styles.container}>
                <TouchableOpacity onPress={togglePopup}>
                    <Text style={[styles.text, { color: themeColors.textColor, marginTop: 20 }]}>12.07.2022 / Ellu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePopup}>
                    <Text style={[styles.text, { color: themeColors.textColor, marginTop: 20 }]}>09.02.2022 / Poju</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isPopupVisible}
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.popup}>
                        <Text style={[styles.text, { color: themeColors.textColor }]}>{Coordinates()}</Text>
                        <TouchableOpacity
                            onPress={handleViewOnMap}>
                            <Text style={[styles.buttonTextForModal, { color: themeColors.textColor, borderColor: themeColors.textColor }]}>View on Map</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={handleCloseModal}>
                            <Text style={[styles.buttonTextForCloseModal, { color: themeColors.textColor, borderColor: themeColors.textColor }]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
    text: {
        fontSize: 18,
    },
    popup: {
        alignItems: 'center',
        borderRadius: 10,
        width: 300,
        height: 230,
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
        borderRadius: 5,
        borderWidth: 1,
        padding: 3,
        marginTop: 70,
    },
});

export default History;
