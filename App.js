import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet, Alert, AppState } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useExpoPushToken } from './hooks/expoPushToken';

Notifications.setNotificationHandler({
   handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
   }),
});



const App = () => {
   const deviceToken = useExpoPushToken();

   useEffect(() => {
      const subscription = Notifications.addNotificationReceivedListener(notification => {
         const data = notification?.request?.content?.data;
         const message = notification?.request?.content?.body || 'Новое сообщение';
         const title = notification?.request?.content?.title || 'Уведомление';
      });

      const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
         const data = response?.notification?.request?.content?.data;

      });

      const appStateListener = AppState.addEventListener('change', nextAppState => {

      });

      return () => {
         subscription.remove();
      };
   }, []);
   
   return (
      <SafeAreaView style={styles.container}>
         <WebView
            source={{ uri: `https://universal.laxo.one/enter/${deviceToken ?? null}` }}
         />
      </SafeAreaView>

   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginTop: 30,
      marginBottom: 30,
      backgroundColor: '#fff', 
   },
});
export default App;