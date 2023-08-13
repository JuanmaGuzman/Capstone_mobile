import React, { useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, TextInput, Dimensions, Pressable, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from "../hooks/UseAuth";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

export default function Login() {

  const navigation = useNavigation();
  const { auth, logout } = useAuth();

  const goToHome = () => {
    navigation.navigate("Navigation");
  }

  const goToLogIn = () => {
    navigation.navigate("Login");
  }

  const goToSignIn = () => {
    navigation.navigate("SignIn");
  }
  useEffect(() => {
    logout();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.tinyLogo} source={require('../assets/oficial_logo.png')} />
      <Text style={styles.titulo}> ¡Bienvenid@ a Nudos Eline! </Text>
      <TouchableOpacity onPress={goToLogIn} style={styles.appButtonContainer}>
        <Text numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.appButtonText}>Inicia sesión</Text>
      </TouchableOpacity>
      <Text style={styles.subtitulo}> o, si no tienes cuenta </Text>
      <TouchableOpacity onPress={goToSignIn} style={styles.appButtonContainer}>
        <Text numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.appButtonText}>Regístrate</Text>
      </TouchableOpacity>
      <Pressable onPress={goToHome}>
        <Text style={styles.continuar}> Continuar como invitad@.</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tinyLogo: {
    height: responsiveScreenHeight(25),
    width: responsiveScreenWidth(55),
    marginTop: 20,
    marginBottom: 15,
    alignSelf: 'center',
  },
  titulo: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: responsiveScreenFontSize(3),
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    alignSelf: 'center',
    textAlign: 'center',
  },
  appButtonContainer: {
    backgroundColor: '#BF3B4B',
    borderWidth: 1,
    borderColor: '#300F13',
    alignSelf: 'center',
    borderRadius: 10,
    width: '50%',
    height: 40,
    marginBottom: 10,
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
  subtitulo: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: responsiveScreenFontSize(1.7),
    color: '#300F13',
    alignItems: 'center',
    alignSelf: 'center',
  },
  continuar: {
    marginTop: 10,
    fontSize: responsiveScreenFontSize(1.7),
    color: '#BF3B4B',
    fontWeight: 'bold',
    alignItems: 'center',
    alignSelf: 'center',
  }
});