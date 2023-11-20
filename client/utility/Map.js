import React from 'react';
import { View, StyleSheet } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { MAPBOX_ACCESS_TOKEN } from '@env';
import {MAANMITTAUSLAITOS_API_KEY} from '@env';

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const Map = () => {

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView 
            style={styles.map}
            styleURL={`https://avoin-karttakuva.maanmittauslaitos.fi/vectortiles/stylejson/v20/generic.json?TileMatrixSet=WGS84_Pseudo-Mercator&api-key=${MAANMITTAUSLAITOS_API_KEY}`}
            centerCoordinate={[24.945831, 60.192059]}
            zoomLevel={8}
            showUserLocation={true}
            logoEnabled={false}
            >
          <Mapbox.Camera
            zoomLevel={8}
            centerCoordinate={[24.945831, 60.192059]}
            animationMode={'flyTo'}
            animationDuration={0}
          />
            <Mapbox.PointAnnotation
              id="marker"
              coordinate={[24.945831, 60.192059]}
              title="Test"/>
        </Mapbox.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 1350,
    width: 400,
  },
  map: {
    flex: 1,
  },
});

export default Map;
