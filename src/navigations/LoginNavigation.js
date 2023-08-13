import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignIn from '../screens/SignIn';
import NewPass from '../screens/NewPass';
import Navigation from './Navigation';

const Stack = createStackNavigator();

export default function LoginNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Welcome' component={Welcome} options={{title: 'Welcome'}}/>
      <Stack.Screen name='Login' component={Login} options={{title: 'Login'}}/>
      <Stack.Screen name='SignIn' component={SignIn} options={{title: 'SignIn'}}/>
      <Stack.Screen name='NewPass' component={NewPass} options={{title: 'NewPass'}}/>
      <Stack.Screen name='Navigation' component={Navigation}/>
    </Stack.Navigator>
  )
}