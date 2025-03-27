import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/screen/loginScreen');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Login" onPress={navigateToLogin} />
    </View>
  );
}

