import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import Account from "./src/screens/MyAccount"
import { api_logout } from './src/services/apiRequests';
import { LogBox } from "react-native";

LogBox.ignoreLogs(['EventEmitter.removeListener'])

export default function App() {

  //api_logout()
  return (
    <NavigationContainer>
      <AuthProvider>
        <Account />
      </AuthProvider>
    </NavigationContainer>
  );
}



