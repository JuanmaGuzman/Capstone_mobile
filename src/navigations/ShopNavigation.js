import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Shop from '../screens/Shop';
import { Image, Text } from 'react-native';


const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image style={{ width: 45, height: 44}}
    source={require('../assets/oficial_logo.png')}
    />
  );
}

export default function ShopNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerLeft: false}}>
      <Stack.Screen name='Shop' component={Shop} options={{
          headerTitle: "",
          headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#BF3B4B'}
        }}/>
    </Stack.Navigator>
  )
}