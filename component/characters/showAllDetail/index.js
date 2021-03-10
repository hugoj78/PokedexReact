import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

const ShowAllCharacterDetail = ({pokemonDetail, navigation}) => {
  const onPress = () => {
    navigation.push('Detail', {id: pokemonDetail.id});
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          <Image
            source={{
              uri: pokemonDetail.sprites.front_default,
            }}
            style={styles.ImageIconStyle}
          />
          <Text style={styles.title}> {pokemonDetail.name} </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    bottom: 60,
    left: 50,
  },
  ImageIconStyle: {
    width: 100,
    height: 100,
    right: 50,
    // resizeMode: 'stretch',
  },
});

export default ShowAllCharacterDetail;
