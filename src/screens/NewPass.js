import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

export default function NewPass() {
  return (
    <View style={styles.container}> 
      <Text style={styles.titulo}>App</Text>
      <Text style={styles.subtitulo}>Recuperar contraseña.</Text>
      <TextInput style={styles.textoInput} placeholder='jmguzman1@uc.cl'></TextInput>
      <TextInput style={styles.textoInput} placeholder='Nueva contraseña' secureTextEntry={true}></TextInput>
      <TextInput style={styles.textoInput} placeholder='Confirmar contraseña' secureTextEntry={true}></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  titulo: {
    fontSize: responsiveScreenFontSize(4),        
    color: '#000',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: responsiveScreenFontSize(3),        
    marginTop: 5,
    marginBottom: 5,
    color: 'gray',
  },
  textoInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    width: '80%',
    height: 50,
    marginTop: 20,
    padding: 10,
    paddingStart: 25,
    paddingEnd: 25,
    borderRadius: 30,
    color: 'gray'
  },
  olvidoContraseña: {
    fontSize: responsiveScreenFontSize(2),        
    color: 'gray',
    marginTop: 20,
  },
  sinCuenta: {
    fontSize: responsiveScreenFontSize(2),        
    color: 'gray',
    marginBottom: 130,
    marginTop: 50,
  }
});