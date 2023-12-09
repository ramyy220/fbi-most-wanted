import React from 'react'
import { View, Text} from 'react-native'
import { StyleSheet } from 'react-native'

const HomeScreen = () => {
  return (
     <View style={styles.container}>
        <Text>Home Screen</Text>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fbfc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
})
export default HomeScreen
