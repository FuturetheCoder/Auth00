import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import { Link, useRouter, Stack } from 'expo-router'; // Import Stack for navigation header
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.129:4000/login', { email, password });
      if (response.status === 200) {
        const token = response.data.token; // Get the token from the response
        // Save the token in AsyncStorage
        await AsyncStorage.setItem('userToken', token);
        // Navigate to the profile page on success
        router.push('/screen/profileScreen');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <>
      {/* Set up the navigation header */}
      <Stack.Screen options={{ title: 'Login Screen' }} />

      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 16, padding: 10, borderWidth: 1, borderRadius: 5 }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ marginBottom: 16, padding: 10, borderWidth: 1, borderRadius: 5 }}
        />
        <Button title="Login" onPress={handleLogin} />
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

        <Link href="/screen/registerScreen">
          <Text style={{ marginTop: 16, color: 'blue' }}>Don't have an account? Register here</Text>
        </Link>
      </View>
    </>
  );
}
