import { StyleSheet, Text, SafeAreaView, TextInput, Dimensions, Pressable, Image, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { generateBackEndService } from '../services/backendService'
import Images from '../assets/index';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

const api = generateBackEndService()

export default function Home() {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const goToHome = () => {
    navigation.navigate("Navigation");
  }

  const goToLogIn = () => {
    navigation.navigate("Login");
  }

  const goToProducto = () => {
    navigation.navigate("Producto");
  }

  const goToCategory = () => {
    navigation.navigate("Category");
  }

  const goToCategorias = () => {
    navigation.navigate("Categorias");
  }


  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [isFocused])
  const fetchData = async () => {
    try {
      const response = await api.get('/publications/publications/all')
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <SafeAreaView>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        {/* Nuevos Productos  */}
        <View>
          <Text style={styles.headerNewProducts}>Nuevos Productos</Text>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data.map((datum,index) => {
              // Falta que agreguen el atributo photo, por eso aún no cargan
              return (
                <TouchableOpacity key={index} onPress={() => {
                  navigation.navigate('Producto', {
                    price: datum.price,
                    name: datum.item.name,
                    photo: 'pantalones_home',
                    id: datum.id
                  });
                }}>
                  <Image style={styles.tinyProduct} source={Images['pantalones_home']} />
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        {/* Chalecos */}
        <View>
          <Text style={styles.headerCategorias}>Chalecos</Text>
          <TouchableOpacity onPress={goToCategorias}>
            <Image style={styles.tinyCategoria} source={require('../assets/chalecos_home.png')} />
          </TouchableOpacity>

        </View>

        {/* Pantalones */}
        <View>
          <Text style={styles.headerCategorias}>Pantalones</Text>
          <TouchableOpacity onPress={goToCategorias}>
            <Image style={styles.tinyCategoria} source={require('../assets/pantalones_home.png')} />
            {/* <Image style={styles.tinyCategoria} source={require('../assets/chalecos_home.png')}/> */}
          </TouchableOpacity>
          {/* <Image style={styles.tinyCategoria} source={require('../assets/pantalones_home.png')}/> */}
        </View>

        {/* Botón ver categorias */}
        <TouchableOpacity onPress={goToCategorias} style={styles.appButtonCategoria}>
          <Text numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.appButtonText}>Ver categorías</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tinyLogo: {
    height: 60,
    width: 60,
    marginTop: 60,
    marginBottom: 25,
    marginLeft: 20,
    justifyContent: 'flex-start',
  },
  subtitulo: {
    justifyContent: 'flex-end',
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(2),
    marginTop: 75,
    marginLeft: 10,
    marginBottom: 25,
  },
  textoInput: {
    backgroundColor: '#fff',
    borderColor: '#300F13',
    borderWidth: 1,
    width: '80%',
    height: 40,
    marginTop: 20,
    marginLeft: 20,
    // alignItems: 'left',
    paddingStart: 10,
    paddingEnd: 10,
    borderRadius: 10,
    color: '#300F13'
  },
  appButtonContainer: {
    backgroundColor: '#BF3B4B',
    borderWidth: 1,
    borderColor: '#300F13',
    alignSelf: 'center',
    borderRadius: 10,
    width: '30%',
    height: 40,
    marginTop: 50,
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 14,
    margin: 10,
    color: "#fff",
    alignItems: 'center',
  },
  olvidoContraseña: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: responsiveScreenFontSize(2),
    color: '#300F13',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  sinCuenta: {
    marginLeft: 20,
    marginTop: 50,
    fontSize: responsiveScreenFontSize(2),
    color: '#300F13',
    justifyContent: 'flex-start',
  },
  registrate: {
    marginTop: 50,
    fontSize: responsiveScreenFontSize(2),
    color: '#BF3B4B',
    fontWeight: 'bold',
    justifyContent: 'flex-end',
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
  tinyCategoria: {
    height: 108,
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  headerNewProducts: {
    height: 21,
    width: 275,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20
  },
  headerCategorias: {
    height: responsiveScreenHeight(5),
    width: 275,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 20,
  },
  appButtonCategoria: {
    backgroundColor: '#BF3B4B',
    borderWidth: 1,
    borderColor: '#300F13',
    alignSelf: 'center',
    borderRadius: 10,
    width: '40%',
    height: 40,
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
  },

});