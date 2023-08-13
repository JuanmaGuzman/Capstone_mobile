import { SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, TextInput, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import Images from '../assets/index';
import { generateBackEndService } from '../services/backendService';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

const api = generateBackEndService()

export default function Adress() {
    const [total, setTotal] = useState(0)
    console.log("page adress loaded")
    const [region, setRegion] = useState("Escoger talla")
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [data, setData] = useState([]);
    // const [status, setStatus] = useState('');

    // setStatus(undefined);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log("focus")
        fetchData()
    }, [isFocused])

    const fetchData = async () => {
        try {
            const response = await api.get('/publications/shopping_cart/shopping_cart/me')
            setData(response.data)
            console.log(response.data)
            console.log(data)
            console.log(data.length)
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <SafeAreaView>
            <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
                <Text style={styles.subtitulo_1}> Resumen de la compra </Text>
                {/* {data.map((datum) =>{
            setTotal(total + datum.publication.price * datum.amount);
        })} */}
                {data.map((datum) => {
                    return (
                        <View style={styles.row}>
                            <Image style={styles.tinyProduct} source={Images['chaleco']} />
                            <View>
                                <Text style={styles.productComponents}> {datum.publication.item}</Text>
                                <Text style={styles.productComponents}> Talla: {datum.publication.size}</Text>
                                <Text style={styles.productComponents}> Cantidad: {datum.amount}</Text>
                                <Text style={styles.productComponents}> Total: ${datum.publication.price * datum.amount}</Text>
                            </View>
                        </View>
                    );
                })}
                {/* <Text>
        Total a pagar: {total}
        </Text> */}
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => {
                    navigation.navigate("Adress");
                }}>
                    <Text style={styles.appButtonText}>Pagar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cartTitle: {
        height: 22,
        width: 275,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 20,
        fontSize: 18,
    },
    tinyProduct: {
        height: 120,
        width: 110,
        marginTop: 12,
        marginBottom: 25,
        marginLeft: 20,
        justifyContent: 'flex-start',
        borderRadius: 10,
    },
    productComponents: {
        marginTop: 5,
        marginLeft: 30,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    appButtonContainer: {
        backgroundColor: '#BF3B4B',
        borderWidth: 1,
        borderColor: '#300F13',
        alignSelf: 'center',
        borderRadius: 10,
        width: '40%',
        height: 40,
        marginTop: 30,
        marginBottom: 30,
        marginBottom: 30,
        marginLeft: 20,
        alignSelf: 'center',
        alignItems: 'center',
    },
    appButtonText: {
        fontSize: 14,
        margin: 10,
        color: "#fff",
        alignSelf: 'center',
        alignItems: 'center',
    },
    subtitulo_1: {
        color: '#300F13',
        // alignItems: 'left',
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 20,
        marginTop: 20,
    },
});