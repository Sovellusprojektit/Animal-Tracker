import React from 'react';
import { View, StyleSheet, TextInput, ImageBackground, Text } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../utility/Theme';

const History = ({ navigation }) => {
    const { themeColors, backgroundImages } = useTheme();


    return (
        <View style={styles.container}>
            <Text style={styles.text}>History</Text>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default History;