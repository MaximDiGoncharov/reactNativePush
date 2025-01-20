import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useExpoPushToken } from './hooks/expoPushToken';

const App = () => {
   const deviceToken = useExpoPushToken();
   const [url, setUrl] = useState(`https://universal.laxo.one/enter/${deviceToken ?? null}`);

   useEffect(() => {
      // Настраиваем обработчик уведомлений
      const subscription = Notifications.addNotificationReceivedListener(notification => {
         const data = notification?.request?.content?.data;
         const message = notification?.request?.content?.body || 'Новое сообщение';
         const title = notification?.request?.content?.title || 'Уведомление';

         // Показ Alert с двумя кнопками
         Alert.alert(
            title, // Заголовок уведомления
            message, // Сообщение уведомления
            [
               {
                  text: 'Закрыть',
                  style: 'cancel', // Закрытие Alert без действий
               },
               {
                  text: 'Перейти',
                  onPress: () => {
                     if (data?.newUrl) {
                        setUrl(data.newUrl); // Обновляем URL в WebView
                     }
                  },
               },
            ]
         );
      });

      // Очищаем подписку при размонтировании компонента
      return () => subscription.remove();
   }, []);

   return (
      <SafeAreaView style={styles.container}>
         <WebView source={{ uri: url }} />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default App;
