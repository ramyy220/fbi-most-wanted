import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

const CustomButton = ({onPress, text, type = "PRIMARY", bgColor, fgColor}) => {
  return (
    <Pressable onPress={onPress}
     style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {}
        ]}>
        <Text style={[
            styles.text,
            styles[`text_${type}`],
            fgColor ? {color: fgColor} : {}
            ]}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    container_PRIMARY: {
        backgroundColor: '#002176',
    },
    container_TERTIARY: {
       width: 'auto',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        
    },
    text_TERTIARY: {
        color: 'gray',
    }
})

export default CustomButton
