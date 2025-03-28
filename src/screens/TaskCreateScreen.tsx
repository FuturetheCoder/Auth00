import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TaskForm } from '../components/TaskForm';
import { useTasks } from '../context/TaskContext';
import { Task, TaskStatus } from '../types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const TaskCreateScreen = () => {
  const navigation = useNavigation();
  const { addTask } = useTasks() as TaskContextType;

  const handleCreate = async (values: Partial<Task>) => {
    if (values.title && values.description && values.dueDate && values.priority) {
      await addTask({
        title: values.title,
        description: values.description,
        dueDate: values.dueDate,
        priority: values.priority,
        status: values.status || TaskStatus.TODO,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TaskForm onSubmit={handleCreate} submitButtonTitle="Create Task" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
}); 