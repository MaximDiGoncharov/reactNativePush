import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { useEffect, useState } from "react";

export const useExpoPushToken = () => {
  const [expoPushToken, setExpoPushToken] = useState("");

  function handleRegistrationError(errorMessage ) {
   //  Alert.alert("Уведомления отключены!", errorMessage, [
   //    {text: "Отмена", style: "cancel"},
   //    {text: "Настройки", onPress: () => Linking.openSettings()},
   //  ]);
    console.log(errorMessage);
    throw new Error(errorMessage);
  }

  async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }



   //  получаем разрешение
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        handleRegistrationError(
          "Разрешите BeBetterBar отрправлять Вам уведомления!",
        );
        return;
      }

      // вытаскиваем projectId
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        handleRegistrationError("Project ID not found");
      }

      // получение токена устройства и проверяем его через https://expo.dev/notifications
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(pushTokenString);
        return pushTokenString;
      } catch (e) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError(
        "Must use physical device for push notifications",
      );
    }
  }


//   запускаем функцию 
  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token),
    );
  }, []);

  return expoPushToken;
};