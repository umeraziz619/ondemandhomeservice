import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const Profile = () => {
  const navigation  = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          // Token is available, fetch user information using the token
          const response = await axios.get('https://tame-pest-production.up.railway.app/users/token', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.log('Error fetching user information:', error);
      }
    };

    fetchUserInformation();
  }, []);
  const handleLogOut = async()=>{
    await AsyncStorage.removeItem('token');
    alert("Log out Successfully")
    navigation.navigate("Login")
  }
  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://img.freepik.com/premium-vector/portrait-young-man-with-beard-hair-style-male-avatar-vector-illustration_266660-423.jpg?w=2000" }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          <TouchableOpacity onPress={handleLogOut} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading user information...</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  avatarContainer: {
    marginBottom: 20,
    borderRadius: 75,
    overflow: 'hidden',
  },
  avatar: {
    width: 150,
    height: 150,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Profile;
