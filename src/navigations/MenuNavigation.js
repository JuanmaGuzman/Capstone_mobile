import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from '../screens/Menu';

const Stack = createStackNavigator();

export default function MenuNavigation() {

  function LogoTitle() {
    return (
      <Image style={{ width: 45, height: 44 }}
        source={require('../assets/oficial_logo.png')}
      />
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerLeft: false }}>
      <Stack.Screen name='Menu' component={Menu} options={{
        headerTitle: "",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#BF3B4B' }
      }} />
    </Stack.Navigator>
  )
}