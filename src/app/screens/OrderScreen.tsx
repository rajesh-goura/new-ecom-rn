import { View, Text, Button , StyleSheet} from 'react-native'
import React from 'react'
import * as Linking from 'expo-linking';

const OrderScreen = () => {
  return (
    <View>
      <Text>this is OrderScreen</Text>
      <View style={styles.container}>
            <Button title="Open a URL" onPress={() => Linking.openURL('https://expo.dev/')} />
      </View>
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
 container:{
  backgroundColor:'red',
 }
});