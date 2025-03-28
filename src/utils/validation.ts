export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateTaskForm = (values: {
  title: string;
  description: string;
  dueDate: Date;
}) => {
  const errors: Record<string, string> = {};

  if (!values.title.trim()) {
    errors.title = 'Title is required';
  }

  if (!values.description.trim()) {
    errors.description = 'Description is required';
  }

  if (!values.dueDate) {
    errors.dueDate = 'Due date is required';
  } else if (new Date(values.dueDate) < new Date()) {
    errors.dueDate = 'Due date cannot be in the past';
  }

  return errors;
}; 