import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import Images from '../assets/index';
import NumericInput from 'react-native-numeric-input';
import RNPickerSelect from 'react-native-picker-select';
import Modal from "react-native-modal";
import { generateBackEndService } from '../services/backendService'
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

const api = generateBackEndService()


export default function Producto({ route, navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const add_to_cart = async (publication_id) => {
    
    try {
      const response = await api.post('/publications/shopping_cart/add_to_cart/' + publication_id, { amount: qty })
      console.log(response.status, "producto agregado")
    } catch (error) {
      console.log(error)
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const { name, price, photo, id } = route.params;
  // const staticImage = require(photo);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("Escoger talla")

  return (
    
      <ScrollView vertical={true}>
        {/* Producto */}
        <View>
          <Image style={styles.product_image} source={Images[photo]} />
          <View style={styles.row}>
            <Text style={styles.product_name}>{name}</Text>
            <Text style={styles.price}> ${price} </Text>
          </View>
          <Text style={styles.headerDescription}>Detalles del producto</Text>
        </View>

        {/* Elegir talla, cantidad, color, etc. */}
        <View style={styles.row_buttons}>
          <NumericInput
            borderRadius={10}
            marginLeft={20}
            minValue={1}
            maxValue={100}
            value={qty}
            onChange={(value) => setQty(value)} />

          <RNPickerSelect
            placeholder={{ label: "Escoger talla", value: null }}
            onValueChange={(value) => setSize(value)}
            items={[
              { label: 'XS', value: 'XS' },
              { label: 'S', value: 'S' },
              { label: 'M', value: 'M' },
              { label: 'L', value: 'L' },
              { label: 'XL', value: 'XL' },
            ]}
            style={pickerStyle}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <View>
          <View style={{ alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
            <Modal style={styles.modalContainer}
              animationIn={"slideInUp"}
              animationOut={"slideOutDown"}
              isVisible={isModalVisible}>
              <View style={{ alignSelf: 'flex-end' }}>
                <View>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Image
                      source={require('../assets/x.png')}
                      style={{ height: responsiveScreenHeight(4), width: responsiveScreenWidth(4) }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../assets/success.png')}
                  style={{ height: responsiveScreenHeight(10), width: responsiveScreenWidth(20), marginVertical: 10 }}
                />
              </View>

              <View>
                <Text style={{ textAlign: 'center' }}> Producto agregado al carro exitosamente! </Text>
              </View>
            </Modal>
          </View>
          <TouchableOpacity style={styles.appButtonAddToCart} onPress={() => {
            toggleModal()
            add_to_cart(id)
            // navigation.navigate('Shop',{
            //       name: name,
            //       price: price,
            //       photo: photo,
            //       qty: qty,
            //       size: size,
            //   }); 
          }}>
            <Text numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.appButtonText}>Añadir al carro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    
  )
}

const styles = StyleSheet.create({
  product_image: {
    height: 295,
    width: '96%',
    marginTop: 12,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 10,
  },
  product_name: {
    height: 30,
    width: responsiveScreenWidth(70),
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    fontSize: responsiveScreenFontSize(2.5),
  },
  price: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: responsiveScreenFontSize(2.3),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row_buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  headerDescription: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: responsiveScreenFontSize(2.4),
  },
  description: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 14
  },
  appButtonAddToCart: {
    backgroundColor: '#BF3B4B',
    borderWidth: 1,
    borderColor: '#300F13',
    alignSelf: 'center',
    borderRadius: 10,
    width: '40%',
    height: 40,
    margin: 20,
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 14,
    margin: 10,
    color: "#fff",
    alignItems: 'center',
  },
  pickerButton: {
    marginLeft: 20,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: '50%'

  },
});

const pickerStyle = {
  inputIOS: {
    color: 'black',
    paddingTop: 13,
    paddingHorizontal: 30,
    paddingBottom: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
  },
  inputAndroid: {
    color: 'black',
  },
  placeholderColor: 'white',
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};