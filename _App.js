import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { 
  setupNotificationHandlers, 
  requestNotificationPermission, 
  registerForPushNotificationsAsync 
} from './notifications';

const App = () => {
  const [pushToken, setPushToken] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // Устанавливаем обработчики уведомлений
    setupNotificationHandlers();

    // Проверяем и запрашиваем разрешение, затем регистрируем токен
    const initializeNotifications = async () => {
      const permission = await requestNotificationPermission();
      setPermissionGranted(permission);

      if (permission) {
        const token = await registerForPushNotificationsAsync();
        setPushToken(token);
      }
    };

    initializeNotifications();
  }, []);

  // Копирование токена в буфер обмена
  const copyToClipboard = () => {
    if (pushToken) {
      Clipboard.setString(pushToken);
      Alert.alert('Copied!', 'Push token copied to clipboard.');
    } else {
      Alert.alert('Error', 'No push token available to copy.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Push Token:</Text>
      <Text style={styles.token}>{pushToken || 'Fetching token...'}</Text>
      {permissionGranted ? (
        <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
          <Text style={styles.buttonText}>Copy to Clipboard</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.warning}>Notification permissions not granted.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  token: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  warning: {
    color: 'red',
    fontSize: 14,
    marginTop: 20,
  },
});

export default App;
