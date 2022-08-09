import {NotificationApi} from './notification';
import {IService, PVoid} from '../../utils/types';


export class ApiService implements IService {
  private inited = false;

  notification: NotificationApi;

  constructor() {
    this.notification = new NotificationApi();
  }

  init = async (): PVoid => {
    if (!this.inited) {
      // your code ...

      this.inited = true;
    }
  };
}
