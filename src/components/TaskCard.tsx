import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task, TaskPriority } from '../types/task';

interface TaskCardProps {
  task: Task;
  onPress: (task: Task) => void;
}

export const TaskCard = ({ task, onPress }: TaskCardProps) => {
  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return '#ff4444';
      case TaskPriority.MEDIUM:
        return '#ffbb33';
      case TaskPriority.LOW:
        return '#00C851';
    }
  };

  return (
    <TouchableOpacity onPress={() => onPress(task)}>
      <View style={styles.card}>
        <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(task.priority) }]} />
        <View style={styles.content}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>
          <Text style={styles.date}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priorityIndicator: {
    width: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
}); 