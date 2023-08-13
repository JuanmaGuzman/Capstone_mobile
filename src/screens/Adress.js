import { SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import Images from '../assets/index';
import { generateBackEndService } from '../services/backendService';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const api = generateBackEndService()

export default function Shop() {
    
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

    // fetchData()
    if (data.length > 0) {
        // const [products, setProducts] = useState([]);
        // const { name, price, photo, qty, size } = route.params;

        return (


            <SafeAreaView>
                <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.cartTitle} >Tu Carrito de compras</Text>
                        {/* <View style={styles.row}>
              <Image style={styles.tinyProduct} source={Images[photo]} />
              <View>
                <Text style={styles.productComponents} >{name}</Text>
                <Text style={styles.productComponents} >Total: ${price * qty}</Text>
                <Text style={styles.productComponents} >Cantidad: {qty}</Text>
                <Text style={styles.productComponents} >Talla: {size}</Text>
              </View> 
              Faltaría agregar la línea de la imagen al dict de index.js y el carrito de compras esta LISTOOOOOOO
            </View> */}
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
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.appButtonContainer} onPress={() => {
                            delete_cart()
                            setCounter(1)

                        }}>
                            <Text style={styles.appButtonText}>Vaciar tu carrito</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.appButtonContainer} onPress={() => {
                            navigation.navigate("Adress");
                        }}>
                            <Text style={styles.appButtonText}>Continuar compra</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>

        )
    } else {
        return (
            <SafeAreaView>
                <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.cartTitle} >Tu Carrito de compras</Text>
                        <View>
                            <Text style={styles.productComponents} >Carrito esta vacío.</Text>
                        </View>
                    </View>
                    {/* <TouchableOpacity style={styles.appButtonContainer} onPress={() => {
          
          setCounter(0)

          }}>
          <Text style={styles.appButtonText}>Res</Text>
        </TouchableOpacity> */}
                </ScrollView>
            </SafeAreaView>
        )
    }
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
        height: 140,
        width: 155,
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
});