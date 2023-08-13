import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react';
import Images from '../assets/index';

export default function Category() {
  return (
    <SafeAreaView>
      <View>
        <ScrollView vertical={true}>
          <Text > Aquí van los productos de cierta categoría. </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}