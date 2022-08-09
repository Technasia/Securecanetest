
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import axios from "axios";
import React from "react";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default function MapComponent() {
    const [x, setX] = React.useState(
        35
    );
    const [y, setY] = React.useState(
        35
    );

    async function GetCoordonate() {
        const { data, status } = await axios.get<CoordonatesModel>(
            'https://reqres.in/api/users',
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        if (status == 200) {
            setX(48.866);
            setY(2.333);
            console.log(x);
            console.log(y);
        }
    }

    //setInterval(GetCoordonate, 3000);


    
    return (
        <MapView style={styles.map}
                 region={{
                     latitude: x,
                     longitude: y,
                     latitudeDelta: 0.005,
                     longitudeDelta: 0.005,
                 }}>
        <Marker
    key={1}
    coordinate={
        {
            latitude: x,
            longitude: y
        }
    }
    title={"Postion"}
    description={"Position de la canne"}>

        </Marker>

        </MapView>
    );
}