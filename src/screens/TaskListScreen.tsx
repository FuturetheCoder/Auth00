import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TaskCard } from '../components/TaskCard';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { taskApi } from '../api/tasks';
import { Task } from '../types/task';
import { LoadingScreen } from '../components/LoadingScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type MainStackParamList = {
  Tasks: undefined;
  TaskDetail: { taskId: string };
  CreateTask: undefined;
};

type TaskListScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Tasks'>;

export const TaskListScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<TaskListScreenNavigationProp>();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await taskApi.getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={(task) => navigation.navigate('TaskDetail', { taskId: task.id })}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <FloatingActionButton
        onPress={() => navigation.navigate('CreateTask')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 