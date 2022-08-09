import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import axios from "axios";
import * as Notifications from 'expo-notifications';
import {useStores} from "../stores";
import {observer} from "mobx-react";

const NotificationData = observer(() => {
    const { notification } = useStores();
    return (
        <>
            <Text>token: {notification.expoPushToken}</Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text>Title: {notification  && notification.currentNotification?.request.content.title} </Text>
                <Text>Body: {notification && notification.currentNotification?.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.currentNotification?.request.content.data)}</Text>
            </View>
        </>
    );
})


export default function ButtonSendNotification() {
    const [notificationSend, setNotificationSend] = useState(false);
    const { notification } = useStores();

    const unregisterPushNotification = () => {
      notification.setExpoPushToken(undefined);
    }

    async function sendNotificationToCane() {
        if (!notificationSend) {
            const {data, status} = await axios.get<SendNotificationModel>(
                'https://reqres.in/api/users',
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );
            if (status == 200) {
                console.log(status);
                setNotificationSend(true)
            }
        }
    }

    return (
        <>
            <NotificationData />
            <TouchableOpacity
                onPress={schedulePushNotification}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Programmer dans le temps</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={unregisterPushNotification}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Unsubscribe</Text>
            </TouchableOpacity>

            {/*<TouchableOpacity
                onPress={sendNotificationToCane}
                style={notificationSend ? styles.buttonDisabled : styles.button}
            >
                <Text style={notificationSend ? styles.buttonTextDisabled : styles.buttonText}>Envoyer une
                    notification</Text>
            </TouchableOpacity>*/}
        </>
    );
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Canne de Jean-Yves",
            body: 'Jean Yves est bien arrivé à la maison 📬',
            data: { data: 'goes here' },
        },
        trigger: { seconds: 3 },
    });
}

const styles = StyleSheet.create({
    buttonDisabled: {
        elevation: 8,
        backgroundColor: "#c8c8c8",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    buttonTextDisabled: {
        fontSize: 18,
        color: "#000",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    button: {
        elevation: 8,
        backgroundColor: "#323296",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 3
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});
