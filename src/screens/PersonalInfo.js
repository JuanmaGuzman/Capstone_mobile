import { ScrollView, Text, View, Pressable, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import useAuth from "../hooks/UseAuth";
import { generateBackEndService } from '../services/backendService';

const api = generateBackEndService()


export default function PersonalInfo() {


    const navigation = useNavigation();

    const goToChangePassword = () => {
        navigation.navigate("ChangePassword");
    }


    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        try {
            const response = await api.get('/user_profiles/user_profiles/me')
            setData(response.data)


        } catch (error) {
            console.log(error)
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{
                paddingTop: 25, width: '80%'
            }}>
                <Text style={styles.headerText}>Usuario:</Text>
                <Text style={styles.texto
                } >{data.username}</Text>
            </View >
            <View style={{ padding: 3, alignSelf: "center", justifyContent: "center", width: '80%', borderBottomWidth: 0.5, borderBottomColor: 'black' }}></View>
            <View style={{ paddingTop: 30, width: '80%' }}>
                <Text style={styles.headerText}>Correo electrónico:</Text>
                <Text style={styles.texto}>{data.email}</Text>
            </View>
            <View style={{ padding: 3, alignSelf: "center", justifyContent: "center", width: '80%', borderBottomWidth: 0.5, borderBottomColor: 'black' }}></View>
            <View style={{ paddingTop: 30, width: '80%' }}>
                <Text style={styles.headerText}>Nombre:</Text>
                <Text style={styles.texto}>{data.first_name}</Text>
            </View>
            <View style={{ padding: 3, alignSelf: "center", justifyContent: "center", width: '80%', borderBottomWidth: 0.5, borderBottomColor: 'black' }}></View>
            <View style={{ paddingTop: 30, width: '80%' }}>
                <Text style={styles.headerText}>Apellido:</Text>
                <Text style={styles.texto}>{data.last_name}</Text>
            </View>
            <View style={{ padding: 3, alignSelf: "center", justifyContent: "center", width: '80%', borderBottomWidth: 0.5, borderBottomColor: 'black' }}></View>
            <View style={{ paddingTop: 30, width: '80%' }}>
                <Text style={styles.headerText}>Contraseña:</Text>
                <View style={{ flexDirection: "row" }}>
                    <Pressable onPress={goToChangePassword}>
                        <Text style={styles.cambiarContraseña}>Cambiar contraseña</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ padding: 3, alignSelf: "center", justifyContent: "center", width: '80%', borderBottomWidth: 0.5, borderBottomColor: 'black' }}></View>
            <Image style={styles.images} source={require('../assets/personal_information.png')} />
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    texto: {
        fontSize: 14,
        paddingTop: 10,
        paddingLeft: '13%',
        color: 'Black',
        textAlign: "left",
        marginRight: 'auto'
    },
    tituloTexto: {
        fontSize: 22,
        paddingTop: 35,
        paddingBottom: 25,
        paddingLeft: '13%',
        color: 'Black',
        textAlign: "left",
        marginRight: 'auto'
    },
    cambiarContraseña: {
        fontSize: 14,
        paddingTop: 10,
        fontWeight: 'bold',
        paddingLeft: '13%',
        textAlign: "left",
        marginRight: 'auto',
        color: '#BF3B4B',
    },
    headerText: {
        fontSize: 15,
        paddingTop: 10,
        paddingLeft: '13%',
        fontWeight: 'bold',
        color: 'Black',
        textAlign: "left",
        marginRight: 'auto'
    },
    images: {
        height: 150,
        width: '65%',
        paddingTop: 35,
        marginTop: 35,
        alignSelf: 'center',
    },
});