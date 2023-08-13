import { ScrollView, TextInput, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React, { useState } from "react";
import { useFormik } from 'formik';
import { generateBackEndService } from '../services/backendService';
import Ionicons from '@expo/vector-icons/Ionicons';
import useAuth from "../hooks/UseAuth";
import { useNavigation } from '@react-navigation/native';


export default function ChangePassword() {

    const [error, setError] = useState("");
    const navigation = useNavigation();
    const goToHome = () => {
        navigation.navigate("Home");
    }
    
    const { auth, logout, login, change_password } = useAuth();
    const formik = useFormik({
        initialValues: initialValues(),
        //validationSchema: Yup.object(validationSchema()),
        //validateOnChange: false,
        onSubmit: (formValues) => {
            setError("")
            const { old_password, new_password1, new_password2 } = formValues;
            if (old_password == undefined || new_password1 == undefined || new_password2 == undefined) {
                setError("Completa los campos para actualizar tu contraseña.");
            }
            else if (old_password == '' || new_password1 == '' || new_password2 == '') {
                setError("Completa los campos para actualizar tu contraseña.");
            } else {
                change_password({
                    old_password: `${old_password}`,
                    new_password1: `${new_password1}`,
                    new_password2: `${new_password2}`,
                })
                goToHome()

            }
        },
    })

    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: "row", paddingLeft: 25, paddingTop: 50 }}>
                <Ionicons name="key" size={44} style={styles.tinyIcon} color="black" />
                <Text
                    style={styles.subtitulo}> Cambiar contraseña </Text>
            </View>
            <View style={{ paddingTop: 1 }}>
                <TextInput
                    style={styles.textoInput}
                    placeholder='Contraseña actual'
                    value={formik.values.old_password}
                    onChangeText={(text) => formik.setFieldValue("old_password", text)}
                ></TextInput>
            </View>
            <View style={{ paddingTop: 20 }}>
                <TextInput
                    style={styles.textoInput}
                    placeholder='Contraseña nueva'
                    value={formik.values.new_password1}
                    onChangeText={(text) => formik.setFieldValue("new_password1", text)}
                ></TextInput>
            </View>

            <View style={{ paddingTop: 20 }}>

                <TextInput
                    style={styles.textoInput}
                    placeholder='Confirmar contraseña nueva'
                    value={formik.values.new_password2}
                    onChangeText={(text) => formik.setFieldValue("new_password2", text)}
                ></TextInput>
            </View>

            <TouchableOpacity onPress={formik.handleSubmit} style={styles.appButtonContainer}>
                <Text numberOfLines={1}
                    adjustsFontSizeToFit
                    style={styles.appButtonText}>Guardar</Text>
            </TouchableOpacity>
            <Text style={styles.error}> {error} </Text>

        </ScrollView >
    )
}

function initialValues() {
    return {
        old_password: "",
        new_password1: "",
        new_password2: "",
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tinyIcon: {
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
        fontSize: 15,
        marginTop: 75,
       
    },
    textoInput: {
        backgroundColor: '#fff',
        borderColor: '#300F13',
        borderWidth: 1,
        width: '80%',
        height: 40,
        alignSelf: 'center',
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
    error: {
        marginTop: 30,
        fontSize: 14,
        color: 'red',
        alignSelf: 'center',
    }
});