import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { useTheme } from '../utility/Theme';
import Mapbox from '@rnmapbox/maps';
import { MAPBOX_ACCESS_TOKEN } from '@env';
import { MAANMITTAUSLAITOS_API_KEY } from '@env';
import { connectTracker, getAnimalLocation, liveTrackingOff, liveTrackingOn, getHistory, buzzerOn, buzzerOff, ledOff, ledOn, getPetData, getPetDetails } from './Tracker';
import { UserLocation } from '@rnmapbox/maps';
import { request, PERMISSIONS } from 'react-native-permissions';

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const Map = ({ route }) => {
  const { themeColors } = useTheme();
  const [animalLocation, setAnimalLocation] = useState([24.945831, 60.192059]);
  const [markerVisible, setMarkerVisible] = useState(true);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [liveTracking, setLiveTracking] = useState(false);
  const [ringBell, setRingBell] = useState(false);
  const [led, setLed] = useState(false);
  const [petName, setPetName] = useState(null);
  const [deviceID, setDeviceID] = useState(null);
  const [petNameVisible, setPetNameVisible] = useState(true);

  const latLongValues = route?.params?.coordinates || null;

  const toggleMarkerVisibility = async () => {
    if (markerVisible && petNameVisible) {
      setMarkerVisible(false);
      setPetNameVisible(false);
    } else {
      setMarkerVisible(true);
      setPetNameVisible(true);
      try {
        const location = await getAnimalLocation();
        setAnimalLocation([location[1], location[0]]);
      } catch (error) {
        console.error("Error while getting location: " + error);
      }
    }
  };

  const getPetName = async () => {
    try {
      const petDetails = await getPetDetails();
      const petName = petDetails.details.name;
      setPetName(petName);
      console.log("Pet name: ", petName);
    } catch (error) {
      console.error("Error while getting pet details: ", error);
    }
  };

  const getDeviceID = async () => {
    try {
      const deviceDATA = await getPetDetails();
      const deviceID = deviceDATA.device._id;
      console.log("Device ID: ", deviceID);
      setDeviceID(deviceID);
    } catch (error) {
      console.error("Error while getting device ID: ", error);
    }
  };

  const handleMapIdle = async () => {
    if (liveTracking) {
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

  const handleToggleRingBell = () => {
    if (ringBell) {
      buzzerOff();
    }
    else {
      buzzerOn();
    }
    setRingBell(!ringBell);
  };

  const handleToggleLed = () => {
    if (led) {
      ledOff();
    }
    else {
      ledOn();
    }
    setLed(!led);
  }

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

    const initializeMap = async () => {
      const isConnected = await connectTracker();

      if (isConnected) {
        try {
          const location = await getAnimalLocation();
          setAnimalLocation([location[1], location[0]]);
          getPetName();
          getDeviceID();
        } catch (error) {
          console.error("Error while getting location: " + error);
        }
      }
    };

    initializeMap();

    if (liveTracking) {
      liveTrackingOn();
      handleMapIdle();
    }

    return () => {
      liveTrackingOff();
    };
  }, [liveTracking]);


  const handleLocationUpdate = (location) => {
    if (liveTracking) {
      setAnimalLocation([location.coords.longitude, location.coords.latitude]);
    }
    setUserLocation(location);
  };

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
          onMapIdle={handleMapIdle}
        >
          {markerVisible && (
            <Mapbox.PointAnnotation
              id="marker"
              coordinate={animalLocation}
              title="Map"
            >
            </Mapbox.PointAnnotation>
          )}
          {petNameVisible && (
            <Mapbox.PointAnnotation
              id="petNameText"
              coordinate={animalLocation}
              title="PetName"
            >
              <Text style={{ fontWeight: 'bold', color: 'red' }}>{petName}</Text>
            </Mapbox.PointAnnotation>
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

          {latLongValues && (
            <Mapbox.ShapeSource id="lineSource" shape={{ type: 'LineString', coordinates: latLongValues }}>
              <Mapbox.LineLayer
                id="lineLayer"
                style={{
                  lineColor: 'red',
                  lineWidth: 2,
                }}
              />
            </Mapbox.ShapeSource>
          )}
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
            //onPress={}
            >
              Update Delay
            </Text>
            <Text style={[styles.buttonTextForModal, { color: themeColors.textColor, marginBottom: 10, borderColor: themeColors.textColor }]}
              onPress={handleToggleRingBell}>
              {ringBell ? 'Turn off Bell' : 'Turn on Bell'}
            </Text>
            <Text style={[styles.buttonTextForModal, { color: themeColors.textColor, marginBottom: 10, borderColor: themeColors.textColor }]}
              onPress={handleToggleLed}>
              {led ? 'Turn off the Light' : 'Turn on the Light'}
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
    height: "100%",
    width: "100%",
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
    width: 140,
    textAlign: 'center',
  },
  buttonTextForCloseModal: {
    fontWeight: 'bold',
    top: 28,
    borderRadius: 5,
    borderWidth: 1,
    padding: 3,
    width: 140,
    textAlign: 'center',
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
    marginTop: 525,
    backgroundColor: '#858585',
  },
  calloutStyle: {
    minHeight: 50,
  },
});

export default Map;
