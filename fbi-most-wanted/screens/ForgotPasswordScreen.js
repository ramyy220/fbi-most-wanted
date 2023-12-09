import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase.js";  // Assurez-vous que c'est le bon chemin d'accès

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');

    const onSend = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert("Check your email", "A link to reset your password has been sent to your email address.", [{ text: "OK" }]);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert("Error", errorMessage, [{ text: "OK" }]);
            });
    };

    const onSignIn = () => {
        console.warn('Sign In');
    };

    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>
                <CustomInput 
                    placeholder='email' 
                    value={email} 
                    setValue={setEmail} 
                    icone={<MaterialCommunityIcons name="email" size={20} color="#002176" />}
                />
                <CustomButton text="Send" onPress={onSend} />
                <CustomButton text="Back to Sign In" onPress={onSignIn} type='TERTIARY' />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
        color: "#002176",
    },
});

export default ForgotPasswordScreen;
