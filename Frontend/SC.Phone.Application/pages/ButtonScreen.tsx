import {StyleSheet, View} from 'react-native';
import React from "react";
import CaneInformationComponent from "../components/CaneInformationComponent";
import ButtonSendNotification from "../components/ButtonSendNotification";


export default function ButtonScreen() {
    return (
        <View style={styles.container}>
            <CaneInformationComponent/>
            <ButtonSendNotification/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
});