import React from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const Register = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });
  const handlePhoneChange = val => {
    setData({
      ...data,
      phoneNumber: val,
    });
  };

  const handleAddressChange = val => {
    setData({
      ...data,
      address: val,
    });
  };
  const handleSignUp = async () => {
    console.log({
      username: data.username,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      address: data.address,
    });
    await axios
      .post(
        'https://tame-pest-production.up.railway.app/users/signup',
        {
          username: data.username,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
          address: data.address,
          type: 'User',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        console.log(response.data);
        if (response.status == 201) {
          alert('Welcome' + username + '\n Acccount Successfully Created');
          navigation.navigate('Root');
        }
        navigation.navigate('Login');
      })
      .catch(error => {
        // handle error
        alert("Account created sucessfully!!");
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#D6ECFE" barStyle="dark-content" />
      <View style={styles.header}>
        <ImageBackground
          style={{flex: 1, height: undefined, width: undefined}}
          source={require('../assets/logo.png')}
        />
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => setData({...data, username: val})}
            />
          </View>
          <Text style={[styles.text_footer, {marginTop: 10}]}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => setData({...data, email: val})}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 10,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={true}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => setData({...data, password: val})}
            />
          </View>

          <Text style={[styles.text_footer, {marginTop: 10}]}>Phone</Text>
          <View style={styles.action}>
            <FontAwesome name="phone" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Phone Number"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePhoneChange(val)}
            />
          </View>

          <Text style={[styles.text_footer, {marginTop: 10}]}>Address</Text>
          <View style={styles.action}>
            <FontAwesome name="address-card-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Address"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleAddressChange(val)}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={handleSignUp}>
              <LinearGradient
                colors={['#4767D6', '#4767D6']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: '#757375',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#4767D6',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7EDFF',
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
