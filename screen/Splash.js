import { StyleSheet, Text, View ,StatusBar,} from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
const Splash = () => {
    const navigation = useNavigation();
    setTimeout(() => {
        navigation.navigate("GetStarted")
    }, 4000);
  return (
    <View style={styles.container}>
    <StatusBar backgroundColor='#D6ECFE' barStyle="light-content"/>
  <View style={styles.header}>
      <Animatable.Image 
          animation="bounceIn"
          duraton="1500"
      source={require('../assets/logo.png')}
      
      style={{height:300,width:300}}
      // resizeMode="stretch"
      />
      <Text style={{fontSize:20,marginTop:10,fontWeight:'bold'}}>On Demand Home Services</Text>
  </View>
</View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#D6ECFE',
        justifyContent:'center',
        alignItems:'center'
      },
      header: {
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center'
      },
})