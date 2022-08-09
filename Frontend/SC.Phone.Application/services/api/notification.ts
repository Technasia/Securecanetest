import {stores} from '../../stores';
import {PVoid} from "../../utils/types";

export class NotificationApi {
  /* Push the expo push notification token to our backend api*/
  register = async (token: string): PVoid => {
    const {notification} = stores;


    try {
      const resp = await fetch('https://cli-rn.batyr.io/api/counter');
      const json: object = await resp.json();

      //notification.set(json.value);
    } catch (e) {
      console.log(e);
    }
  };
}
