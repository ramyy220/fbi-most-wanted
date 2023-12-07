import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import CostumInput from "../components/CustomInput";
import { useState } from "react/cjs/react.development";
import CustomButton from "../components/CustomButton";
import {MaterialCommunityIcons} from '@expo/vector-icons';


const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');


    const onSend = () => {
        console.warn('send');
    };
    const onSignIn = () => {
        console.warn('Sign In');
    }

    return (
         <ScrollView>
        <View style={styles.root}>
       <Text style={styles.title}>Reset your password </Text>
       <CostumInput placeholder='email' value={email} setValue={setEmail} icone={<MaterialCommunityIcons name="email" size={20} color="#002176" />}/>

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
        color: "002176",
    },
});


export default ForgotPasswordScreen;