import React, { useEffect } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, TouchableOpacity, Text, Modal, Alert } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../utility/Theme';
import { getAccessToken } from '../utility/Auth';
import axios from 'axios';
import { IP_ADDRESS } from '@env';

const AccountInfo = ({ navigation }) => {
    const { themeColors, backgroundImages } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    const [userDetails, setUserDetails] = useState({
                fname: '',
                lname: '',
                email: '',
            });

            useEffect(() => {
                const getUserDetails = async () => {
                  try {
                    const token = await getAccessToken();
                    if (token) {
                      const response = await axios.get(`http://${IP_ADDRESS}:8080/getUserInfo`, {
                        headers: {
                          'content-type': 'application/json',
                          'Accept': 'application/json',
                          'Authorization': `Bearer ${token}`,
                        },
                      });
              
                      if (response.status === 200) {
                        const { fname, lname, email } = response.data;
                        setUserDetails({ fname, lname, email });
                      } else {
                        console.log('Error:', response);
                        Alert.alert('Error receiving user details');
                      }
                    }
                  } catch (error) {
                    console.error('Error:', error);
                    Alert.alert('Error receiving user details');
                  }
                };
              
                getUserDetails();
              }, []);
        
    const handleButtonPress = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <ImageBackground source={backgroundImages.backgroundImage} style={styles.container}>
            {modalVisible ? null : (
                <View style={[styles.container, { color: themeColors.textColor }]} >
                    <TextInput
                        style={[styles.textinput, { borderColor: themeColors.textColor }]}
                        placeholder="First name"
                        placeholderTextColor={themeColors.textColor}
                        color={themeColors.textColor}
                        value={userDetails.fname}
                        onChangeText={(text) => setUserDetails({ ...userDetails, fname: text })}
                    />
                    <TextInput
                        style={[styles.textinput, { borderColor: themeColors.textColor }]}
                        placeholder="Last name"
                        placeholderTextColor={themeColors.textColor}
                        color={themeColors.textColor}
                        value={userDetails.lname}
                        onChangeText={(text) => setUserDetails({ ...userDetails, lname: text })}
                    />
                    <TextInput
                        style={[styles.textinput, { borderColor: themeColors.textColor }]}
                        placeholder="Email"
                        placeholderTextColor={themeColors.textColor}
                        color={themeColors.textColor}
                        value={userDetails.email}
                        onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
                    />
                    <TouchableOpacity
                        style={[styles.buttonstyle, { backgroundColor: themeColors.backgroundColor }]}
                        onPress={handleButtonPress}
                    >
                        <Text style={[{ color: themeColors.textColor }]}>
                            Change password
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttonstyle, { backgroundColor: themeColors.backgroundColor }]}
                    >
                        <Text style={[styles.frgPasswbuttonText, { color: themeColors.textColor }]}
                        //onPress={getUserDetails}
                        >
                            Update values
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonstyleGoBack, { backgroundColor: themeColors.backgroundColor }]}
                    >
                        <Text
                            style={[{ color: themeColors.textColor }]}
                            onPress={() => navigation.navigate('Home')}
                            >
                            Go back
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={[styles.modalContainer, { color: themeColors.textColor }]} >
                    <TextInput
                        style={[styles.textinput, { borderColor: themeColors.textColor }]}
                        placeholder="Password"
                        placeholderTextColor={themeColors.textColor}
                        color={themeColors.textColor}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={[styles.textinput, { borderColor: themeColors.textColor }]}
                        placeholder="New password"
                        placeholderTextColor={themeColors.textColor}
                        color={themeColors.textColor}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={[styles.buttonstyle, { backgroundColor: themeColors.backgroundColor }]}
                        onPress={handleCloseModal}>
                        <Text
                            style={[{ color: themeColors.textColor }]}>
                            Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonstyleGoBack, { backgroundColor: themeColors.backgroundColor }]}
                    >
                        <Text
                            style={[{ color: themeColors.textColor }]}
                            onPress={handleCloseModal}>
                            Go back
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textinput: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    buttonstyle: {
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        width: 150,
        alignItems: 'center',
    },
    buttonstyleGoBack: {
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        width: 100,
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 160,
        borderRadius: 10,
    },
});

export default AccountInfo;
