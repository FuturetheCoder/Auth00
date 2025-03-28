import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from './Input';
import { Button } from './Button';
import { Task, TaskPriority, TaskStatus } from '../types/task';
import { validateTaskForm } from '../utils/validation';

interface TaskFormProps {
  initialValues?: Partial<Task>;
  onSubmit: (values: Partial<Task>) => Promise<void>;
  submitButtonTitle: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  dueDate?: string;
}

export const TaskForm = ({ initialValues, onSubmit, submitButtonTitle }: TaskFormProps) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [dueDate, setDueDate] = useState(initialValues?.dueDate || new Date());
  const [priority, setPriority] = useState(initialValues?.priority || TaskPriority.MEDIUM);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async () => {
    const values = { title, description, dueDate, priority };
    const formErrors = validateTaskForm(values);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setLoading(true);
      await onSubmit({
        ...values,
        status: initialValues?.status || TaskStatus.TODO,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        error={errors.title}
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        error={errors.description}
      />
      <DateTimePicker
        value={dueDate}
        mode="datetime"
        onChange={(_, date) => date && setDueDate(date)}
      />
      <Button
        title={submitButtonTitle}
        onPress={handleSubmit}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
}); 