import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomInput from "../components/CustomInput";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../config/firebase.js";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";


const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigation = useNavigation();

  const validatePassword = (password) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onRegisterPressed = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    
    const user = userCredential.user;
    console.log("user created");

    
    return setDoc(doc(firestore, "users", user.uid), {
      username: username,
      email: email,


     
    });
  })
  .then(() => {
    console.log("User document created in Firestore");
    navigation.navigate('Login'); 
  })
  .catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error", errorCode, errorMessage);
  });

    }
  };

  const onSignInFacebook = () => {
    console.warn('Sign in with Facebook');
  };

  const onSignInGoogle = () => {
    console.warn('Sign in with Google');
  };

  const onSignInApple = () => {
    console.warn('Sign in with Apple');
  };

  const onSignIn = () => {
    
    navigation.navigate('Login');
  };


  

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput 
          placeholder='username' 
          value={username} 
          setValue={setUsername} 
          icone={<MaterialCommunityIcons name="account" size={20} color="#002176" />} 
        />
        <CustomInput 
          placeholder='email' 
          value={email} 
          setValue={setEmail} 
          error={!!emailError}
          icone={<MaterialCommunityIcons name="email" size={20} color={emailError ? 'red' : "#002176"} />}
          inputStyle={{ color: emailError ? 'red' : null }}
        />
        {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
        <CustomInput 
          placeholder='password' 
          value={password} 
          setValue={setPassword} 
          secureTextEntry 
          error={!!passwordError}
          icone={<MaterialCommunityIcons name="lock" size={20} color={passwordError ? 'red' : "#002176"} />}
          inputStyle={{ color: passwordError ? 'red' : null }}
        />
        {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
        <CustomButton text="Register" onPress={onRegisterPressed} />

        <CustomButton text="Sign In with Facebook" onPress={onSignInFacebook} bgColor="#e7e1f4" fgColor='#4765a9' icone={<MaterialCommunityIcons name="facebook" size={20} color="#4765a9" />} />
        <CustomButton text="Sign In with Google" onPress={onSignInGoogle} bgColor='#fae9ea' fgColor='#dd4d44' icone={<MaterialCommunityIcons name="google" size={20} color="#dd4d44" />} />
        <CustomButton text="Sign In with Apple" onPress={onSignInApple} bgColor='#e3e3e3' fgColor='#363636' icone={<MaterialCommunityIcons name="apple" size={20} color="#363636" />} />

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
    color: "#002176",
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
  },
});

export default SignUpScreen;