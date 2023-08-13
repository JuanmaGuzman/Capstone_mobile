import React, { useState, createContext } from 'react';
import { generateBackEndService } from '../services/backendService'

const backEnd = generateBackEndService()

export const AuthContext = createContext({
    auth: undefined,
    login: () => { },
    logout: () => { },
    change_password: () => { },

});


export function AuthProvider(props) {
    const api = generateBackEndService()
    const { children } = props;
    const [auth, setAuth] = useState(undefined);

    const login = async (userData) => {
        try {
            console.log("Entramos a setear auth")
            const response = await api.post('/auth/', userData)
            console.log(response.data)
            setAuth(response.data)
            const response2 = await api.get('/auth/me')
            console.log(response2.data)
        } catch (error) {
            console.log(error)
        }
    };
    const change_password = async (userData) => {
        try {
            const response = await api.post('/auth/change_password', userData)
            console.log(response.status, "estado")


        } catch (error) {
            console.log(error)
        }
    };

    const logout = async () => {
        try {
            const response2 = await api.get('/auth/me')
            console.log(response2.data)
            await api.delete('/auth/')
            setAuth(undefined)
        } catch (error) {
            console.log(error)
        }
    };

    // Acá obtenemos la información del usuario
    const valueContext = {
        auth,
        login,
        logout,
        change_password,
    };

    return (
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    )
}
