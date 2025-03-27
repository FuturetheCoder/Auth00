import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router'; // Import Stack for navigation header

export default function ProfileScreen() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // Make the request using the token in the headers
          const response = await axios.get('http://192.168.0.129:4000/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProfile(response.data);
        } else {
          console.log('No token found, please login again');
        }
      } catch (err) {
        console.log('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      {/* Set up the navigation header */}
      <Stack.Screen options={{ title: 'Profile Screen' }} />

      <View style={styles.container}>
        {profile ? (
          <Text>Welcome, {profile.username}!</Text>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});
