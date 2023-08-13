import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Producto from '../screens/Producto';
import Category from '../screens/Category';
import Categorias from '../screens/Categorias';
import Shop from '../screens/Shop';
import Adress from '../screens/Adress';
import Summary from '../screens/Summary';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Image, Text } from 'react-native'


const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image style={{ width: 45, height: 44 }}
      source={require('../assets/oficial_logo.png')}
    />
  );
}

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerLeft: false }}>
      <Stack.Screen name='Home' component={Home} options={{
        headerTitle: "",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#BF3B4B' }
      }} />
      <Stack.Screen name='Producto' component={Producto} options={{
        headerTitle: "",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#BF3B4B' }
      }} />
      <Stack.Screen name='Category' component={Category} options={{
        headerTitle: "",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#BF3B4B' }
      }} />
      <Stack.Screen name='Categorias' component={Categorias} options={{
        headerTitle: "",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#BF3B4B' }
      }} />
      <Stack.Screen name='Shop' component={Shop} options={{
        headerTitle: "",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#BF3B4B' }
      }} />
      <Stack.Screen name='Adress' component={Adress} options={{
        headerTitle: "",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#BF3B4B' }
      }} />
      <Stack.Screen name='Summary' component={Summary} options={{
        headerTitle: "",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#BF3B4B' }
      }} />
    </Stack.Navigator>
  )
}
