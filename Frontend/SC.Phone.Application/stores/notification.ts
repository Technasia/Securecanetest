import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';
import {Notification} from "expo-notifications";
import {IStore, PVoid} from "../utils/types";

export class NotificationStore implements IStore {

    expoPushToken: string | undefined = undefined;
    setExpoPushToken = (v: string | undefined): void => {
        this.expoPushToken = v;
    };

    currentNotification: Notification | null = null;
    setCurrentNotification = (v: Notification | null): void => {
        this.currentNotification = v;
    };

    constructor() {
        makeAutoObservable(this);

        makePersistable(this, {
            name: NotificationStore.name,
            properties: ['expoPushToken'],
        });
    }

    hydrate = async (): PVoid => {
        await hydrateStore(this);
    };
}
