import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import { TaskProvider } from './src/context/TaskContext';
import { RootNavigation } from './src/navigation';
import { enableScreens } from 'react-native-screens';

enableScreens();

export default function App() {
  return (
    <AuthProvider children={
      <TaskProvider children={
        <>
          <StatusBar style="dark" />
          <RootNavigation />
        </>
      } />
    } />
  );
} 