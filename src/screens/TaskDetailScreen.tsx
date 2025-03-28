import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { TaskForm } from '../components/TaskForm';
import { Button } from '../components/Button';
import { LoadingScreen } from '../components/LoadingScreen';
import { useTasks } from '../context/TaskContext';
import { Task } from '../types/task';

type TaskDetailRouteProp = RouteProp<{
  TaskDetail: { taskId: string };
}, 'TaskDetail'>;

interface TaskContextType {
  tasks: Task[];
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  loading: boolean;
}

export const TaskDetailScreen = () => {
  const { params } = useRoute<TaskDetailRouteProp>();
  const navigation = useNavigation();
  const { tasks, updateTask, deleteTask, loading } = useTasks() as TaskContextType;
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const currentTask = tasks.find(t => t.id === params.taskId);
    if (currentTask) {
      setTask(currentTask);
    }
  }, [params.taskId, tasks]);

  const handleUpdate = async (updatedTask: Partial<Task>) => {
    try {
      await updateTask(params.taskId, updatedTask);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update task');
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTask(params.taskId);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete task');
            }
          },
        },
      ]
    );
  };

  if (loading || !task) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <TaskForm
        initialValues={task}
        onSubmit={handleUpdate}
        submitButtonTitle="Update Task"
      />
      <Button
        title="Delete Task"
        onPress={handleDelete}
        variant="secondary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
}); 