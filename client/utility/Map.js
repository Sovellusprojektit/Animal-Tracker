import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../utility/Theme';
import Mapbox from '@rnmapbox/maps';
import { MAPBOX_ACCESS_TOKEN } from '@env';
import { MAANMITTAUSLAITOS_API_KEY } from '@env';
import { connectTracker, getAnimalLocation } from './Tracker';

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const Map = () => {
  const { themeColors } = useTheme();
  const [animalLocation, setAnimalLocation] = useState([24.945831, 60.192059]);
  const [markerVisible, setMarkerVisible] = useState(true);

  const toggleMarkerVisibility = async () => {
    if (markerVisible) {
      setMarkerVisible(false);
    } else {
      setMarkerVisible(true);
      try {
        const location = await getAnimalLocation();
        setAnimalLocation([location[1], location[0]]);
      } catch (error) {
        console.error("Error while getting location: " + error);
      }
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      const isConnected = await connectTracker();
      
      if (isConnected) {
        try {
          const location = await getAnimalLocation();
          setAnimalLocation([location[1], location[0]]);
        } catch (error) {
          console.error("Error while getting location: " + error);
        }
      }
    };

    initializeMap();
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          styleURL={`https://avoin-karttakuva.maanmittauslaitos.fi/vectortiles/stylejson/v20/generic.json?TileMatrixSet=WGS84_Pseudo-Mercator&api-key=${MAANMITTAUSLAITOS_API_KEY}`}
          centerCoordinate={[25.527834, 65.003387]}
          zoomLevel={6}
          showUserLocation={true}
          logoEnabled={false}
        >
          <Mapbox.Camera
            zoomLevel={6}
            centerCoordinate={[25.527834, 65.003387]}
            animationMode={'flyTo'}
            animationDuration={0}
          />
          {markerVisible && (
            <Mapbox.PointAnnotation
              id="marker"
              coordinate={animalLocation}
              title="Test"
            />
          )}
        </Mapbox.MapView>

        <TouchableOpacity
          style={[styles.toggleButton, { backgroundColor: themeColors.backgroundColor }]}
          onPress={toggleMarkerVisibility}
        >
          <Text style={[styles.buttonText, { color: themeColors.textColor }]}>
            {markerVisible ? 'Hide Marker' : 'Show Marker'}
          </Text>
        </TouchableOpacity>
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
    height: 1445,
    width: 400,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default Map;
