import { StyleSheet, Text, ScrollView, TextInput, Pressable, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import useAuth from "../hooks/UseAuth";
import { generateBackEndService } from '../services/backendService';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

const backEnd = generateBackEndService()

export default function SignIn() {

  const navigation = useNavigation();
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [checkboxState, setCheckboxState] = React.useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    //validationSchema: Yup.object(validationSchema()),
    //validateOnChange: false,
    onSubmit: (formValues) => {
      setError("")
      const { username, email, name, last_name, password } = formValues;
      if (username == '' || email == '' || name == '' || last_name == '' || password == '') {
        setError("Completa tus datos para crear tu cuenta.");
      } else {
        backEnd.post('/user_profiles/user_profiles/create',
          {
            username: `${username}`,
            email: `${email}`,
            first_name: `${name}`,
            last_name: `${last_name}`,
            password1: `${password}`,
            password2: `${password}`
          })
          .then((response: AxiosResponse) => {
            console.log(response.status);
            goToLogIn()
          })
          .catch((reason: AxiosError) => {
            if (reason.response.status === 400) {
              console.log("Error 400: usuario ya existe?")
              console.log(reason)

            } else {
              console.log("Error al crear usuario.")

            }
            setError("Error al crear tu cuenta.");
            console.log(reason.message)
          })
      }
    },
  })

  const goToLogIn = () => {
    navigation.navigate("Login");
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.tinyLogo} source={require('../assets/oficial_logo.png')} />
        <Text style={styles.subtitulo}> Crear cuenta </Text>
      </View>
      <TextInput
        style={styles.textoInput}
        placeholder='Nombre de Usuario'
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      ></TextInput>
      <TextInput
        style={styles.textoInput}
        placeholder='Correo electrónico'
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
      ></TextInput>
      <TextInput
        style={styles.textoInput}
        placeholder='Nombre'
        value={formik.values.name}
        onChangeText={(text) => formik.setFieldValue("name", text)}
      ></TextInput>
      <TextInput
        style={styles.textoInput}
        placeholder='Apellido'
        value={formik.values.last_name}
        onChangeText={(text) => formik.setFieldValue("last_name", text)}
      ></TextInput>
      <TextInput
        style={styles.textoInput}
        placeholder='Contraseña'
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}></TextInput>
      <BouncyCheckbox
        isChecked={checkboxState}
        size={25}
        marginTop={25}
        marginLeft={20}
        marginRight={20}
        text="Quiero estar al día con las promociones y recibir tendencias, novedades y descuentos."
        textStyle={{ textDecorationLine: "none", color: "#300F13", fontSize: 12, width: responsiveScreenWidth(80) }}
        fillColor="#300F13"
        unfillColor="#fff"
        iconStyle={{ borderColor: "#300F13" }}
        innerIconStyle={{ borderRadius: 10, }}
        onPress={() => setCheckboxState(!checkboxState)} />
      <TouchableOpacity onPress={formik.handleSubmit} style={styles.appButtonContainer}>
        <Text numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.appButtonText}>Crear cuenta</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.conCuenta}> Si ya tienes cuenta, </Text>
        <Pressable onPress={goToLogIn}>
          <Text style={styles.iniciaSesion}> inicia sesión. </Text>
        </Pressable>
      </View>
      <Text style={styles.error}> {error} </Text>
    </ScrollView>
  )
}

function initialValues() {
  return {
    name: "",
    email: "",
    birthdate: "",
    password: "",
  };
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
    justifyContent: 'center',
  },
  subtitulo: {
    justifyContent: 'flex-end',
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(3),
    marginTop: 75,
    marginLeft: 25,
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
    fontSize: responsiveScreenFontSize(2),
    margin: 10,
    color: "#fff",
    alignItems: 'center',
  },
  olvidoContraseña: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: responsiveScreenFontSize(1),
    color: '#300F13',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  conCuenta: {
    marginLeft: 20,
    marginTop: 50,
    fontSize: responsiveScreenFontSize(2),
    color: '#300F13',
    justifyContent: 'flex-start',
  },
  iniciaSesion: {
    marginTop: 50,
    fontSize: responsiveScreenFontSize(2),
    color: '#BF3B4B',
    fontWeight: 'bold',
    justifyContent: 'flex-end',
  },
  error: {
    marginTop: 30,
    fontSize: 14,
    color: 'red',
    alignSelf: 'center',
  }
});