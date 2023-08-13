import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Text } from 'react-native';
import Search from '../screens/Search';
import Category from '../screens/Category';
import Categorias from '../screens/Categorias';

const Stack = createStackNavigator();

export default function SearchNavigation() {

  function LogoTitle() {
    return (
      <Image style={{ width: 45, height: 44 }}
        source={require('../assets/oficial_logo.png')}
      />
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerLeft: false }}>
      <Stack.Screen name='Search' component={Search} options={{
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
    </Stack.Navigator>
  )
}