import { SafeAreaView, Text, Pressable, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import { Icon } from "react-native-elements";
import { generateBackEndService } from '../services/backendService'
import Images from '../assets/index';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

const api = generateBackEndService()

export default function Menu() {

  const navigation = useNavigation();
  const isFocused = useIsFocused();


  const goToCategory = () => {
    navigation.navigate("Category");
  }

  const goToCategorias = () => {
    navigation.navigate("Categorias");
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [isFocused])

  const fetchData = async () => {
    try {
      const response = await api.get('/publications/publications/all')
      setData(response.data)


    } catch (error) {
      console.log(error)
    }
  };



  const onChangeSearch = query => {
    if (query) {

      const NewData = data.filter(itemo => {

        const itemData = itemo.item.name.toUpperCase()
        const brandData = itemo.item.brand.toUpperCase()
        const item8brand = itemData + ' ' + brandData;


        const textData = query.toUpperCase()

        return item8brand.indexOf(textData) > -1
      })

      setSearchQuery(NewData);

    } else {
      setSearchQuery(query);
    }

  }

  // const datah = [{name:'Polera'},{name:'Colale'},{name:'Chaqueta'},{name:'Chaleca'},{name:'Jean Azul'}]

  if (searchQuery == '') {
    return (
      <SafeAreaView style={styles.container}>
        <Searchbar style={{ borderRadius: 10, margin: 18 }} placeholder="Buscar..."
          onChangeText={onChangeSearch} value={searchQuery} />
        <Pressable onPress={goToCategorias} style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 20 }}>
          <Text style={styles.texto_bold}>Categorías</Text>
        </Pressable>
        <Pressable onPress={goToCategory} style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 20 }}>
          <Text style={styles.texto_bold}>Nuevos</Text>
        </Pressable>
        <Pressable onPress={goToCategory} style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 20 }}>
          <Text style={styles.texto}>Jeans</Text>
        </Pressable>
        <Pressable onPress={goToCategory} style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 20 }}>
          <Text style={styles.texto}>Poleras</Text>
        </Pressable>
        <Pressable onPress={goToCategory} style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 20 }}>
          <Text style={styles.texto}>Camisas</Text>
        </Pressable>
        <Pressable onPress={goToCategory} style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 20 }}>
          <Text style={styles.texto}>Polerones</Text>
        </Pressable>
        <Pressable onPress={goToCategory} style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 20 }}>
          <Text style={styles.texto}>Poleras</Text>
        </Pressable>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Searchbar style={{ borderRadius: 10, margin: 18 }} placeholder="Buscar..." onChangeText={onChangeSearch} value={searchQuery} />

        {searchQuery.map((publication,index) => {
          return (
            <TouchableOpacity key={index} onPress={() => {
              navigation.navigate('Producto', {
                name: publication.item.name,
                price: publication.price,
                photo: 'outfit_mujer',
                id: publication.id
              });
            }}>
              <View style={styles.row}>

                <Image style={styles.tinyProduct} source={Images['outfit_mujer']} />
                <Text style={styles.rowText}>{publication.item.name} {publication.item.brand}</Text>


              </View>
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tinyProduct: {
    height: 100,
    width: 115,
    justifyContent: 'flex-start',
    borderRadius: 10,

  },
  texto_bold: {
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(2),
    color: '#300F13',
    alignSelf: 'center'
  },
  texto: {
    fontSize: responsiveScreenFontSize(2),
    color: '#300F13',
    alignSelf: 'center'
  },
  row: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 15,
    flexDirection: "row",
    paddingHorizontal: 0.5,
  },
  rowText: {
    fontSize: responsiveScreenFontSize(2),
    paddingLeft: '20%',
    color: '#300F13',
    alignSelf: 'center',
  },


});