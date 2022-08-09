import React from 'react';

import {ApiService} from './api';
import {PVoid, Services} from "../utils/types";
import {NotificationsService} from "./NotificationsService";

export const services = {
  NotificationsService: new NotificationsService(),
  api: new ApiService()
};
type ContextServices = typeof services;

const servicesContext = React.createContext<ContextServices>(services);
export const ServicesProvider = ({children}: any) => (
  <servicesContext.Provider value={services}>{children}</servicesContext.Provider>
);

export const useServices = (): ContextServices => React.useContext(servicesContext);

export const initServices = async (): PVoid => {
  for (const key in services) {
    if (Object.prototype.hasOwnProperty.call(services, key)) {
      const s = (services as Services)[key];

      if (s.init) {
        await s.init();
      }
    }
  }
};
