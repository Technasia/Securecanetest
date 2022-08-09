import {IService, PVoid} from '../utils/types';
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {Platform} from "react-native";

export class NotificationsService implements IService {
  private inited = false;

  registerForPushNotificationsAsync = async (): Promise<string|undefined> => {
    let token;
    if (Device.isDevice) {
      const {status: existingStatus} = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  init = async (): PVoid => {
    if (!this.inited) {
      this.inited = true;
    }
  };
}
