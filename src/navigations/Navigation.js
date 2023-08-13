import React from 'react';
import { createBottomTabNavigator, initialRouteName } from '@react-navigation/bottom-tabs';
import { Entypo, Feather } from '@expo/vector-icons';
import HomeNavigation from './HomeNavigation';
import MenuNavigation from './MenuNavigation';
import SearchNavigation from './SearchNavigation';
import ProfileNavigation from './ProfileNavigation';
import ShopNavigation from './ShopNavigation';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator initialRouteName={'Home'}>
      <Tab.Screen name="Menu" component={MenuNavigation} options={{ tabBarLabel: "Contacto", tabBarIcon: () => (<Feather name="mail" size={24} color="black" />) }} />
      <Tab.Screen name="Search" component={SearchNavigation} options={{ tabBarLabel: "Buscar", tabBarIcon: () => (<Feather name="search" size={24} color="black" />) }} />
      <Tab.Screen name="Home" component={HomeNavigation} options={{ tabBarLabel: "Inicio", tabBarIcon: () => (<Entypo name="home" size={24} color="black" />) }} />
      <Tab.Screen name="Profile" component={ProfileNavigation} options={{ tabBarLabel: "Perfil", tabBarIcon: () => (<Feather name="user" size={24} color="black" />) }} />
      <Tab.Screen name="Shop" component={ShopNavigation} options={{ tabBarLabel: "Carrito", tabBarIcon: () => (<Feather name="shopping-cart" size={24} color="black" />) }} />
    </Tab.Navigator>
  )
}