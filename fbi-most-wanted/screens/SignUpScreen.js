import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import CostumInput from "../components/CustomInput";
import { useState } from "react/cjs/react.development";
import CustomButton from "../components/CustomButton";
import {MaterialCommunityIcons} from '@expo/vector-icons';


const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const onRegisterPressed = () => {
        console.warn('Register');
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
    const onSignIn = () => {
        console.warn('Sign In');
    }

    return (
         <ScrollView>
        <View style={styles.root}>
       <Text style={styles.title}>Create an account</Text>
       <CostumInput placeholder='username' value={username} setValue={setUsername}/>
       <CostumInput placeholder='email' value={email} setValue={setEmail}/>
       <CostumInput placeholder='password' value={password} setValue={setPassword} secureTextEntry/>
       <CostumInput placeholder='retype password' value={retypePassword} setValue={setRetypePassword} secureTextEntry/>

         <CustomButton text="Register" onPress={onRegisterPressed} />

         <CustomButton text="Sign In with Facebook" onPress={onSignInFacebook} bgColor="#e7e1f4" fgColor='#4765a9' />
         <CustomButton text="Sign In with Google" onPress={onSignInGoogle} bgColor='#fae9ea' fgColor='#dd4d44' />
         <CustomButton text="Sign In with Apple" onPress={onSignInApple} bgColor='#e3e3e3' fgColor='#363636' />

         <CustomButton text="Have an account? Sign In" onPress={onSignIn} type='TERTIARY' />
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
        color: '#015c600',
    },
});


export default SignUpScreen;

