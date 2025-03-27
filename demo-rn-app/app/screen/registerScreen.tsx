import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';
import { Stack } from 'expo-router'; // Import Stack for AppBar

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.0.129:4000/register', { username, email, password });
      if (response.status === 200) {
        router.push('/screen/loginScreen'); // Navigate to login on success
      }
    } catch (err) {
      setError('Registration failed');
      console.log(err);
    }
  };

  const navigateToLogin = () => {
    router.push('/screen/loginScreen');
  };

  return (
    <>
      {/* Set up the AppBar */}
      <Stack.Screen options={{ title: 'Register Screen' }} />

      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{ marginBottom: 16, padding: 10, borderWidth: 1, borderRadius: 5 }}
        />
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
        <Button title="Register" onPress={handleRegister} />
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

        <Text style={{ marginTop: 16, color: 'blue' }} onPress={navigateToLogin}>
          Already have an account? Login here
        </Text>
      </View>
    </>
  );
}
