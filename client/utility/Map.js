import React from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { MAPBOX_ACCESS_TOKEN } from '@env';

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const Map = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map} />
      </View>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 300,
    width: 300,

  },
  map: {
    flex: 2,
  }
});