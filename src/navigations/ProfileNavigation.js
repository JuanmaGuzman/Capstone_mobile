import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import useAuth from "../hooks/UseAuth";
import Profile from '../screens/Profile';
import PersonalInfo from '../screens/PersonalInfo';
import ShoppingRecord from '../screens/ShoppingRecord';
import Favorites from '../screens/Favorites';
import ChangePassword from '../screens/ChangePassword';
import SignIn from '../screens/SignInInvit';

const Stack = createStackNavigator();

export default function ProfileNavigation() {

  function LogoTitle() {
    return (
      <Image style={{ width: 45, height: 44 }}
        source={require('../assets/oficial_logo.png')}
      />
    );
  }

  const { auth } = useAuth();

  if (auth == undefined) {
    return (
      <Stack.Navigator screenOptions={{ headerLeft: false }}>
        <Stack.Screen name='Profile' component={Profile} options={{
          headerTitle: "",
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#BF3B4B' }
        }} />
        <Stack.Screen name='SignIn' component={SignIn} />
      </Stack.Navigator>
    )
  } else {
    return (
      <Stack.Navigator screenOptions={{ headerLeft: false }}>
        <Stack.Screen name='Profile' component={Profile} options={{
          headerTitle: "",
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#BF3B4B' }
        }} />
        <Stack.Screen name='PersonalInfo' component={PersonalInfo} options={{
          headerTitle: "",
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#BF3B4B' }
        }} />
        <Stack.Screen name='ShoppingRecord' component={ShoppingRecord} options={{
          headerTitle: "",
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#BF3B4B' }
        }} />
        <Stack.Screen name='Favorites' component={Favorites} options={{
          headerTitle: "",
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#BF3B4B' }
        }} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} options={{
          headerTitle: "",
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#BF3B4B' }
        }} />
        <Stack.Screen name='SignIn' component={SignIn} />
      </Stack.Navigator>
    )
  }
}