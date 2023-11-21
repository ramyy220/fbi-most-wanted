import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const CustomInput = ({value, setValue, placeholder, secureTextEntry, icone }) => {
  return (
    <View style={styles.container}>
      <TextInput
       icone={icone} 
       value={value}
       onChangeText={setValue}
       style={styles.input}
       placeholder={placeholder}
       secureTextEntry={secureTextEntry} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
    
})

export default CustomInput
