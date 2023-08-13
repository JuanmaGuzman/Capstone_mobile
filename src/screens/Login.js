import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, TextInput, Dimensions, Pressable, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from "yup";
import useAuth from "../hooks/UseAuth";
import { generateBackEndService } from '../services/backendService';

const backEnd = generateBackEndService()

export default function Login() {

  const navigation = useNavigation();

  const [error, setError] = useState("");

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    //validationSchema: Yup.object(validationSchema()),
    //validateOnChange: false,
    onSubmit: (formValues) => {
      setError("")
      const { email, password } = formValues;

      if (email == '' || password == '') {
        setError("Completa tus datos para iniciar sesión.");
      } else {
        console.log("Login correcto!");
        login(formValues);
      }
    },
  })

  const goToSignIn = () => {
    navigation.navigate("SignIn");
  }

  // const goToNewPass = () => {
  //   navigation.navigate("NewPass");
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.tinyLogo} source={require('../assets/oficial_logo.png')} />
        <Text
          style={styles.subtitulo}> Iniciar sesión </Text>
      </View>
      <TextInput
        style={styles.textoInput}
        placeholder='Correo electrónico'
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
      ></TextInput>
      <TextInput
        style={styles.textoInput}
        placeholder='Contraseña'
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      ></TextInput>
      {/* <Pressable onPress={ goToNewPass }> */}
      <Text style={styles.olvidoContraseña}>¿Olvidaste tu contraseña?</Text>
      {/* </Pressable> */}
      <TouchableOpacity onPress={formik.handleSubmit} style={styles.appButtonContainer}>
        <Text numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.appButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.sinCuenta}>¿No tienes cuenta aún? </Text>
        <Pressable onPress={goToSignIn}>
          <Text style={styles.registrate}> Regístrate.</Text>
        </Pressable>
      </View>
      <Text style={styles.error}> {error} </Text>
    </SafeAreaView>
  )
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

/* function validationSchema() {
  return {
    email: Yup.string().required("¡Email inválido!"),
    password: Yup.string().required("¡Contraseña inválida!"),
  };
} */

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
    fontSize: 25,
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
    fontSize: 14,
    color: '#300F13',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  sinCuenta: {
    marginLeft: 20,
    marginTop: 50,
    fontSize: 14,
    color: '#300F13',
    justifyContent: 'flex-start',
  },
  registrate: {
    marginTop: 50,
    fontSize: 14,
    color: '#BF3B4B',
    fontWeight: 'bold',
    justifyContent: 'flex-end',
  },
  error: {
    marginTop: 50,
    marginLeft: 20,
    fontSize: 14,
    color: 'red',
    alignSelf: 'center',
  }
});

// async function api_login(email, password) {

//   console.log("En request disconect")
//   await backEnd.post('/auth/', { email: `${email}`, password: `${password}`})
//   .then(response => console.log(response.data))
//   .catch(error => console.log(error.data))
// }