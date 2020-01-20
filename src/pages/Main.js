import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null)

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync()

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        })

        const { latitude, longitude } = coords

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        })
      }
    }

    loadInitialPosition()
  }, [])

  if (!currentRegion) return null

  return (
    <MapView initialRegion={ currentRegion } style={styles.map}>
      <Marker coordinate= {{ latitude: -12.9647218, longitude: -38.4327789 }}>
        <Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/9796166?s=460&v=4' }}/>
        <Callout onPress={() => {
          // Navegação
          navigation.navigate('Profile', { github_username: 'fafa1' })
        }}>
          <View style={styles.callout}>
            <Text style={styles.devName}>Fagner Batista</Text>
            <Text style={styles.devBio}>Graduado em Ciências da Computação</Text>
            <Text style={styles.devTechs}>Vue.js, node.js, react-native, react.js</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderColor: '#FFF'
  },

  callout: {
    width: 260
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },

  devBio: {
    color: '#666',
    marginTop: 5
  },

  devTechs: {
    marginTop: 5
  }
})

export default Main