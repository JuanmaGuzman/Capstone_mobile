import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import Images from '../assets/index';
import NumericInput from 'react-native-numeric-input';
import RNPickerSelect from 'react-native-picker-select';
import Modal from "react-native-modal";
import { generateBackEndService } from '../services/backendService'
import { useNavigation, useIsFocused } from '@react-navigation/native';

const api = generateBackEndService()

export default function PaymentTransferInfo() {

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [data, setData] = useState([]);

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        console.log("focus")
        fetchData()
    }, [isFocused])

    const fetchData = async () => {
        try {
            const response = await api.get('/publications/publications/all')
            setData(response.data)

        } catch (error) {
            console.log(error)
        }
    };

    const delete_cart = async () => {
        try {
            const response = await api.delete('publications/shopping_cart/remove_all_cart/me')
            setData([])
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <SafeAreaView>
            <View>
                <Image style={styles.tinyLogo} source={require('../assets/oficial_logo.png')} />
                <Text style={styles.titulo}> ¡Gracias por comprar en Nudos Eline! </Text>
                <Text style={styles.subtitulo}> De momento no tenemos medio de
                    pago disponible, pero puedes transferir a nuestra cuenta para pagar.
                    REcuerda enviar el comprobante de pago para que podamos hacer efectiva tu compra. </Text>
                <Text style={styles.datos}> Aquí irían los datos de transferencia </Text>
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => {
                    delete_cart()
                    setCounter(1)
                    NavigationPreloadManager.navigate("Home")
                }}>
                    <Text style={styles.appButtonText}> Volver a Home y dar por finalizada tu compra </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tinyLogo: {
        height: 200,
        width: 200,
        marginTop: 40,
        marginBottom: 25,
        alignSelf: 'center',
    },
    titulo: {
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 25,
        alignSelf: 'center',
        textAlign: 'center',
    },
    subtitulo: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14,
        color: '#300F13',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    datos: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 10,
        color: '#300F13',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    appButtonText: {
        fontSize: 14,
        margin: 10,
        color: "#fff",
        alignSelf: 'center',
        alignItems: 'center',
    },
    appButtonContainer: {
        backgroundColor: '#BF3B4B',
        borderWidth: 1,
        borderColor: '#300F13',
        alignSelf: 'center',
        borderRadius: 10,
        width: '50%',
        height: 40,
        marginTop: 30,
        marginBottom: 30,
        marginBottom: 30,
        alignSelf: 'center',
        alignItems: 'center',
    },
});