import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

/**
 * Устанавливает обработчики уведомлений
 */
export const setupNotificationHandlers = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

/**
 * Запрашивает разрешение на уведомления у пользователя
 * @returns {Promise<boolean>} true, если разрешение предоставлено; иначе false
 */
export const requestNotificationPermission = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permission required', 'You need to enable notifications to receive alerts.');
      return false;
    }

    return true;
  } else {
    Alert.alert('Error', 'Notifications are only available on physical devices.');
    return false;
  }
};

/**
 * Регистрирует устройство для получения push-уведомлений и возвращает токен
 * @returns {Promise<string|null>} Токен или null, если произошла ошибка
 */
export const registerForPushNotificationsAsync = async () => {
  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Device token:', token);
    return token;
  } catch (error) {
    console.error('Error getting push token:', error);
    return null;
  }
};
