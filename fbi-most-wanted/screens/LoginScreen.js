import React from "react";
import { StyleSheet, View, Text, Image, useWindowDimensions, ScrollView } from "react-native";
import Logo from "../assets/Seal_of_the_FBI.svg.png";
import CostumInput from "../components/CustomInput";
import { useState } from "react/cjs/react.development";
import CustomButton from "../components/CustomButton";
import { Ionicons } from '@expo/vector-icons';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignInPressed = () => {
        console.warn('Sign in');
    };
    const onForgot = () => {
        console.warn('Forgot Password');
    };
    const onSignInFacebook = () => {
        console.warn('Sign in with Facebook');
    }
    const onSignInGoogle = () => {
        console.warn('Sign in with Google');
    }
    const onSignInApple = () => {
        console.warn('Sign in with Apple');
    }
    const onSignUp = () => {
        console.warn('Sign Up');
    }

    const {height} = useWindowDimensions();
    return (
         <ScrollView>
        <View style={styles.root}>
       <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode='contain' />
       <CostumInput placeholder='email' value={email} setValue={setEmail} icone={<Ionicons name="md-mail" size={20} color="black" />}/>
       <CostumInput placeholder='password' value={password} setValue={setPassword} secureTextEntry/>

         <CustomButton text="Sign In" onPress={onSignInPressed} />
         <CustomButton text="Forgot Password?" onPress={onForgot} type='TERTIARY' />

         <CustomButton text="Sign In with Facebook" onPress={onSignInFacebook} bgColor="#e7e1f4" fgColor='#4765a9' />
         <CustomButton text="Sign In with Google" onPress={onSignInGoogle} bgColor='#fae9ea' fgColor='#dd4d44' />
         <CustomButton text="Sign In with Apple" onPress={onSignInApple} bgColor='#e3e3e3' fgColor='#363636' />

         <CustomButton text="Don't have an account? Create one" onPress={onSignUp} type='TERTIARY' />
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    logo:{
        maxWidth: 200,
        maxHeight: 200,
        marginTop: 50,
    },
    root: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
});


export default LoginScreen;