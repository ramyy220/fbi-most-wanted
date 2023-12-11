import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, icone, error }) => {
  return (
    <View style={[styles.container, error ? styles.errorContainer : null]}>
      <View style={styles.inputContainer}>
        {React.cloneElement(icone, { color: error ? 'red' : icone.props.color })}
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={error ? 'red' : '#9e9e9e'}
          secureTextEntry={secureTextEntry}
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  errorContainer: {
    borderColor: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flex: 1, 
    marginLeft: 10,
  },
});

export default CustomInput;
