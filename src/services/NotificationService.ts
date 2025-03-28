import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Task } from '../types/task';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const NotificationService = {
  requestPermissions: async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  },

  scheduleTaskReminder: async (task: Task) => {
    const triggerDate = new Date(task.dueDate);
    triggerDate.setHours(triggerDate.getHours() - 1);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Reminder',
        body: `The task "${task.title}" is due in 1 hour`,
        data: { taskId: task.id },
      },
      trigger: {
        date: triggerDate,
        type: Notifications.SchedulableTriggerInputTypes.DATE,
      },
    });
  },

  cancelTaskReminder: async (taskId: string) => {
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    const notification = notifications.find(
      n => n.content.data?.taskId === taskId
    );
    if (notification) {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
  },
}; 