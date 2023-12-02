import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { useTheme } from '../utility/Theme';
import Mapbox from '@rnmapbox/maps';
import { MAPBOX_ACCESS_TOKEN } from '@env';
import { MAANMITTAUSLAITOS_API_KEY } from '@env';
import { connectTracker, getAnimalLocation, liveTrackingOff, liveTrackingOn, getHistory } from './Tracker';
import { UserLocation } from '@rnmapbox/maps';
import { request, PERMISSIONS } from 'react-native-permissions';

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const Map = () => {
  const { themeColors } = useTheme();
  const [animalLocation, setAnimalLocation] = useState([24.945831, 60.192059]);
  const [markerVisible, setMarkerVisible] = useState(true);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [liveTracking, setLiveTracking] = useState(false);

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

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };

  const handleCloseModal = () => {
    setPopupVisibility(false);
  };

  const handleToggleLiveTracking = () => {
    if (liveTracking) {
      liveTrackingOff(); 
    } else {
      liveTrackingOn(); 
    }
    setLiveTracking(!liveTracking);
  };

  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        if (result === 'granted') {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      })
      .catch((error) => {
        console.error('Error requesting location permission:', error);
      });
  }, []);

  const handleLocationUpdate = (location) => {
    setUserLocation(location);
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
          styleURL={`https://avoin-karttakuva.maanmittauslaitos.fi/vectortiles/stylejson/v20/generic.json?api-key=${MAANMITTAUSLAITOS_API_KEY}`}
          centerCoordinate={[25.527834, 65.003387]}
          zoomLevel={6}
          showUserLocation={true}
          logoEnabled={false}
        >
          {markerVisible && (
            <Mapbox.PointAnnotation
              id="marker"
              coordinate={animalLocation}
              title="Test"
            />
          )}
          {userLocation && (
            <Mapbox.Camera
              centerCoordinate={[userLocation.coords.longitude, userLocation.coords.latitude]}
              zoomLevel={15}
              animationMode={'flyTo'}
              animationDuration={0}
            />
          )}
          <UserLocation animated={true} visible={true} onUpdate={handleLocationUpdate} />
        </Mapbox.MapView>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleMarkerVisibility}
        >
          <Text style={[styles.buttonTextForMarker, { color: themeColors.textColor }]}>
            {markerVisible ? 'Hide Marker' : 'Show Marker'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={togglePopup}
        >
          <Text style={[styles.buttonTextForMarker, { color: themeColors.textColor }]}>
            Info
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isPopupVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.popup}>
            <Text style={[styles.buttonTextForModal, { color: themeColors.textColor, marginBottom: 10, borderColor: themeColors.textColor }]}
            onPress={getHistory}>
              Update Delay
            </Text>
            <Text style={[styles.buttonTextForModal, { color: themeColors.textColor, marginBottom: 10, borderColor: themeColors.textColor }]}>
              Ring the Bell
            </Text>
            <Text style={[styles.buttonTextForModal, { color: themeColors.textColor, marginBottom: 10, borderColor: themeColors.textColor }]}>
              Turn on the Light
            </Text>
            <Text
              style={[styles.buttonTextForModal, { color: themeColors.textColor, borderColor: themeColors.textColor }]}
              onPress={handleToggleLiveTracking}>
              {liveTracking ? 'Turn off Live' : 'Turn on Live'}
            </Text>
            <Text
              style={[styles.buttonTextForCloseModal, { color: themeColors.textColor, borderColor: themeColors.textColor }]}
              onPress={handleCloseModal}>
              Close
            </Text>
          </View>
        </Modal>
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
  toggleButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#858585',
  },
  buttonTextForMarker: {
    fontWeight: 'bold',
  },
  buttonTextForModal: {
    fontWeight: 'bold',
    top: 10,
    borderRadius: 5,
    borderWidth: 1,
    padding: 3,
  },
  buttonTextForCloseModal: {
    fontWeight: 'bold',
    top: 28,
    borderRadius: 5,
    borderWidth: 1,
    padding: 3,
  },
  infoButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#858585',
  },
  popup: {
    alignItems: 'center',
    margin: 13,
    borderRadius: 10,
    width: 150,
    height: 200,
    marginTop: 548,
    backgroundColor: '#858585',
  },
});

export default Map;
