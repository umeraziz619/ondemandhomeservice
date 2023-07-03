import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Card = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('')

  const options = [
    {
      title: 'Electrician',
      type: 'Electrician',
      image: require('../assets/electrician.jpg'),
    },
    {
      title: 'Plumber',
      type: 'Plumber',
      image: require('../assets/plumber.png'),
    },
  ];

  const handleOptionPress = async (type) => {
    setModalVisible(true);
    setTitle('');
    setDescription('');
    setType(type)
  };

  const handleModalSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        const data = {
          title: title,
          description: description,
          type: type,
          status: 'Pending',
        };
        const response = await axios.post(
          `https://tame-pest-production.up.railway.app/jobs/electrician`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Job created successfully:', response.data);
      }
      setModalVisible(false);
    } catch (error) {
      console.log('Error creating job:', error);
    }
  };

  return (
    <View>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.container}
          onPress={() => handleOptionPress(option.type)}
        >
          <Animatable.Image
            animation="bounceIn"
            duraton="1500"
            source={option.image}
            style={{ height: 150, width: 400 }}
          />
          <Text style={styles.title}>{option.title}</Text>
        </TouchableOpacity>
      ))}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Title:</Text>
          <TextInput
            style={styles.modalInput}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <Text style={styles.modalTitle}>Enter Description:</Text>
          <TextInput
            style={styles.modalInput}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <Button title="OK" onPress={handleModalSubmit} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 10,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Card;
