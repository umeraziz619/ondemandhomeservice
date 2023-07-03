import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Myjobs = () => {
  const [userJobs, setUserJobs] = useState([]);

  useEffect(() => {
    getTokenAndUserJobs();
  }, []);

  const getTokenAndUserJobs = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('https://tame-pest-production.up.railway.app/users/token');

        console.log(response.data);
        setUserJobs(response.data.appliedForJob);
      }
    } catch (error) {
      console.log('Error retrieving token and user jobs:', error);
    }
  };

  return (
    <View style={styles.container}>
      {userJobs.length > 0 ? (
        userJobs.map((job, index) => (
          <View key={index} style={styles.jobContainer}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobDescription}>{job.description}</Text>
            <Text style={styles.jobCategory}>{job.category}</Text>
            <Text style={styles.jobStatus}>{job.status}</Text>
          </View>
        ))
      ) : (
        <Text>No jobs found.</Text>
      )}
    </View>
  );
};

export default Myjobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  jobContainer: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  jobDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  jobCategory: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  jobStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
});
