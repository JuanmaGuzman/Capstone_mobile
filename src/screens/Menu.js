import { SafeAreaView, ScrollView, Text, View, StyleSheet, Pressable, Linking, Image } from 'react-native';
import React from 'react';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

export default function Menu() {

  const goToSendEmail = () => {
    Linking.openURL('mailto:contacto@nudoseline.com');
  }

  const goToSendWsp = () => {
    Linking.openURL('https://wa.me/56962577416');
  }

  const goToWebPage = () => {
    Linking.openURL('https://google.com');
  }

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.images} source={require('../assets/contact_us.png')} />
      <Text style={styles.subtitulo}> Contacto </Text>
      <View style={{ padding: 3, width: "90%" }}>
        <View style={{ flexDirection: "row" }}>
          <Text numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.texto}> Página web: </Text>
          <Pressable onPress={goToWebPage}>
            <Text style={styles.contacto}> www.NudosEline.com </Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.texto}> Email: </Text>
          <Pressable onPress={goToSendEmail}>
            <Text style={styles.contacto}> contacto@nudoseline.com</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={styles.texto}> Whatsapp: </Text>
          <Pressable onPress={goToSendWsp}>
            <Text style={styles.contacto}> +56 9 6257 7416 </Text>
          </Pressable>
        </View>
      </View>
      <View style={{ padding: 8, alignSelf: "center", width: "90%", borderBottomWidth: 0.5, borderBottomColor: 'black' }}></View>
      <Text style={styles.subtitulo}> ¿Quiénes somos? </Text>
      <View style={{ padding: 3, width: "90%" }}>
        <Text style={styles.texto_largo}>
        Somos una empresa de venta al por menor, experta en ayudar a nuestros clientes a encontrar la vestimenta perfecta.  También puedes encontrar todos los accesorios personalizados y hechos a mano para perfeccionar tu hogar.
        Nuestra fundadora Jacqueline, hoy se suma a la venta online para llegar a más lugares. Este sitio fue creado en el proyecto Capstone del Departamento de Ciencia de la Computación de Ingeniería UC.
      </Text>
      </View>
      <View style={{ padding: 8, alignSelf: "center", justifyContent: "center", width: "90%", borderBottomWidth: 0.5, borderBottomColor: 'black' }}></View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  images: {
    height: 180,
    width: '75%',
    marginTop: 15,
    marginBottom: 5,
    alignSelf: 'center',
  },
  subtitulo: {
    fontSize: responsiveScreenFontSize(3),
    paddingTop: 40,
    paddingLeft: 20,
    fontWeight: "bold",
    color: '#300F13',
    // alignSelf: 'left'
  },
  texto: {
    fontSize: responsiveScreenFontSize(2),
    paddingTop: 10,
    paddingLeft: 20,
    color: 'Black',
    // alignSelf: 'left'
  },
  texto_largo: {
    fontSize: responsiveScreenFontSize(1.8),
    paddingTop: 10,
    paddingLeft: 20,
    color: 'Black',
  },
  contacto: {
    fontSize: responsiveScreenFontSize(2),    
    fontWeight: 'bold',
    paddingTop: 10,
    color: '#BF3B4B',
    // alignSelf: 'left'
  },
});