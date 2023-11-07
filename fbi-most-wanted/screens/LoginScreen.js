import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.inputContainer}>
            <TextInput placeholder='Email' autoFocus type='email' style={styles.input}/>
            <TextInput placeholder='Password' secureTextEntry type='password' style={styles.input} />
             </View>
        <View style={styles.buttonContainer}> 
            <TouchableOpacity onPress={() => {}} style={styles.button}> 
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={[styles.button, styles.buttonOutline]}> 
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    inputContainer: {
        width: '80%',

    },
    buttonContainer: {
        width: '60%',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',


    },
    input: {
        height: 50,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#2b68e6',
        width: '100%',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        borderColor: '#2b68e6',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#2b68e6',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    
})

