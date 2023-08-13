import { SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import Images from '../assets/index';
import { generateBackEndService } from '../services/backendService';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

const api = generateBackEndService()

export default function Shop() {
  console.log("page loaded")
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
                    <Text style={styles.productComponents}>{datum.name}</Text>
                    <Text style={styles.productComponents}> Talla: {datum.size}</Text>
                    <Text style={styles.productComponents}> Cantidad: {datum.amount}</Text>
                    <Text style={styles.productComponents}> Total: ${datum.price * datum.amount}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => {
            delete_cart()
            setCounter(1)

          }}>
            <Text numberOfLines={1}
                  adjustsFontSizeToFit
                  style={styles.appButtonText}>Vaciar tu carrito</Text>
          </TouchableOpacity>
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
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  cartTitle: {
    height: responsiveScreenHeight(4),
    width: 275,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    fontSize: responsiveScreenFontSize(2),
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
    color: 'black',
    marginTop: 5,
    marginLeft: 30,
    fontSize: responsiveScreenFontSize(2),
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
    width: '50%',
    height: 40,
    marginTop: 30,
    marginBottom: 30,
    marginBottom: 30,
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