import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'react-native-crypto-js';
import { SECRET_SIGNING_KEY, IP_ADDRESS } from '@env'
import axios from 'axios';




export const saveAccessToken = async (accessToken) => {
    const encryptedToken = CryptoJS.AES.encrypt(accessToken, SECRET_SIGNING_KEY).toString();
    await AsyncStorage.setItem('encryptedToken', encryptedToken);
    console.log('Access token saved');
};


export const getAccessToken = async () => {
    const encryptedToken = await AsyncStorage.getItem('encryptedToken');

    if (encryptedToken) {
        const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, SECRET_SIGNING_KEY).toString(CryptoJS.enc.Utf8);
        return decryptedToken;
    }

    console.log('No access token found');
    return null;
};


export const handleLogin = async (email, password) => {
    try {
        const response = await axios.post(`http://${IP_ADDRESS}:8080/auth/login`, {

        
            email: email,
            password: password,
        });

        if (response.status === 200) {
            const accessToken = response.data.token;
            saveAccessToken(accessToken);
            console.log('Login successful');
            return true;


        }else if(response.status === 403){
            console.log('Forbidden: Check your email and password ', response.status);
            return false;
        } 
        
        else {
            console.error('Login failed: ', response.status);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
};




