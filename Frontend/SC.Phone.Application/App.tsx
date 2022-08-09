import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Notifications from 'expo-notifications';
import MapScreen from "./pages/MapScreen";
import ButtonScreen from "./pages/ButtonScreen";
import React, {useEffect, useRef} from "react";
import {StoresProvider, useStores} from "./stores";
import {Subscription} from 'expo-modules-core';
import {ServicesProvider, useServices} from './services';


const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

function App(){
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();
    const {notification} = useStores();
    const {NotificationsService} = useServices();

    useEffect(() => {

        NotificationsService.registerForPushNotificationsAsync().then(token => notification.setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(incomingNotification => {
            console.log(incomingNotification)
            notification.setCurrentNotification(incomingNotification);
        });

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);

    return (
        <NavigationContainer>
            <StoresProvider>
                <ServicesProvider>
                    <Tab.Navigator>
                        <Tab.Screen name="Map" component={MapScreen}
                                    options={{
                                        tabBarLabel: 'Map',
                                        tabBarIcon: ({color, size}) => (
                                            <MaterialCommunityIcons name="map" color={color} size={size}/>
                                        ),
                                    }}/>
                        <Tab.Screen name="Envoyé une notif" component={ButtonScreen}
                                    options={{
                                        tabBarLabel: 'Envoyer une notif',
                                        tabBarIcon: ({color, size}) => (
                                            <MaterialCommunityIcons name="motion-sensor" color={color} size={size}/>
                                        ),
                                    }}/>
                    </Tab.Navigator>
                </ServicesProvider>
            </StoresProvider>
        </NavigationContainer>
    );
}