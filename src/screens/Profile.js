import { SafeAreaView, Text, Pressable, StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from "react";
import useAuth from "../hooks/UseAuth";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useFormik } from 'formik';
import Ionicons from '@expo/vector-icons/Ionicons';
import { generateBackEndService } from '../services/backendService';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";


const backEnd = generateBackEndService()

export default function Profile() {

  const navigation = useNavigation();
  const { auth, logout, login, change_password } = useAuth();
  const [error, setError] = useState("");
  const [checkboxState, setCheckboxState] = React.useState(false);

  const goToPersonalInfo = () => {
    navigation.navigate("PersonalInfo");
  }

  const goToShoppingRecord = () => {
    navigation.navigate("ShoppingRecord");
  }

  const goToFavorites = () => {
    navigation.navigate("Favorites");
  }

  const goToLogIn = () => {
    navigation.navigate("Login");
  }

  const goToSignIn = () => {
    navigation.navigate("SignIn");
  }

  if (auth == undefined) {
    useEffect(() => {
      
    goToSignIn();
    }, [])
  
  } else {
    const { email } = auth;
    return (
      <SafeAreaView style={styles.container}>
        <Pressable onPress={goToPersonalInfo} style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 50, width: responsiveScreenWidth(60)}}>
          <Ionicons name="person-circle-outline" size={24} color="black" />
          <Text style={styles.texto}> Información personal </Text>
          <Ionicons style={{ paddingLeft: 78 }} name="arrow-forward-sharp" size={24} color="black" />
        </Pressable>
        {/* <View style={{ padding: 8, alignSelf: "center", width: 300, borderBottomWidth: 0.5, borderBottomColor: 'black' }}></View> */}
        <Pressable onPress={goToShoppingRecord} style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 50, width: responsiveScreenWidth(60) }}>
          <Ionicons name="newspaper-outline" size={24} color="black" />
          <Text style={styles.texto}> Historial de compras </Text>
          <Ionicons style={{ paddingLeft: 80 }} name="arrow-forward-sharp" size={24} color="black" />
        </Pressable>
        {/* <View style={{ padding: 8, alignSelf: "center", width: 300, borderBottomWidth: 0.5, borderBottomColor: 'black' }}></View> */}
        {/* <View style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 50 }}> */}
        <Pressable onPress={goToFavorites} style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 50, width: responsiveScreenWidth(60) }}>
          <Ionicons name="heart-circle-outline" size={24} color='black' />
          <Text style={styles.texto}> Productos favoritos </Text>
          <Ionicons style={{ paddingLeft: 85 }} name="arrow-forward-sharp" size={24} color="black" />
        </Pressable>
        {/* </View> */}
        {/* <View style={{ padding: 8, alignSelf: "center", width: 300, borderBottomWidth: 0.3, borderBottomColor: 'black' }}></View> */}
        <Pressable onPress={logout} style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 50, width: responsiveScreenWidth(60)  }}>
          <Ionicons name="exit-outline" size={24} color='#BF3B4B' />
          <Text style={styles.cerrarSesion}> Cerrar sesión </Text>
        </Pressable>
      </SafeAreaView >
    )
  }
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
  icon: {
    paddingLeft: 20,
  },
  cerrarSesion: {
    fontSize: responsiveScreenFontSize(2),
    paddingLeft: 25,
    color: '#BF3B4B',
    alignSelf: 'center',
  },
  texto: {
    fontSize: responsiveScreenFontSize(2),
    paddingLeft: 25,
    color: '#300F13',
    alignSelf: 'center'
  },
  info: {
    marginTop: 20,
    fontSize: responsiveScreenFontSize(2),
    color: '#300F13',
    justifyContent: 'flex-end',
  },
  error: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: responsiveScreenFontSize(2),
    color: 'red',
    alignSelf: 'center',
  }
});