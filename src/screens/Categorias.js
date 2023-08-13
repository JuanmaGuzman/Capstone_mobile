import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react';
import Images from '../assets/index';

export default function Categorias() {
  return (
    <SafeAreaView>
      <View>
        <ScrollView vertical={true}>
          <Text > Categorías. </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}