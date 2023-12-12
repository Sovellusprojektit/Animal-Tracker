import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Dimensions } from 'react-native';
import { useTheme } from '../utility/Theme';
import Mapbox from '@rnmapbox/maps';
import { MAPBOX_ACCESS_TOKEN } from '@env';
import { MAANMITTAUSLAITOS_API_KEY } from '@env';
import { connectTracker, getAnimalLocation, liveTrackingOff, liveTrackingOn, getHistory, buzzerOn, buzzerOff, ledOff, ledOn } from './Tracker';
import { UserLocation } from '@rnmapbox/maps';
import { request, PERMISSIONS } from 'react-native-permissions';

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const Map = ({ route }) => {
  const { themeColors } = useTheme();
  const [animalLocation, setAnimalLocation] = useState([24.945831, 60.192059]);
  const [markerVisible, setMarkerVisible] = useState(true);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [centerCoordinate, setCenterCoordinate] = useState([0, 0]);
  const [updateCenter, setUpdateCenter] = useState(true);
  const [liveTracking, setLiveTracking] = useState(false);
  const [ringBell, setRingBell] = useState(false);
  const [led, setLed] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const latLongValues = route?.params?.latLongValues || null;

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

  const handleToggleLiveTracking = async () => {
    setLiveTracking(prevLiveTracking => !prevLiveTracking);
    if (!liveTracking) {
      liveTrackingOn();
    } else {
      liveTrackingOff();
      clearInterval(intervalId);
    }
  };

  useEffect(() => {
    let id;
    if (liveTracking) {
      id = setInterval(async () => {
        const location = await getAnimalLocation();
        setAnimalLocation([location[1], location[0]]);
      }, 5000);
    }
    setIntervalId(id);

    return () => {
      clearInterval(id);
    };
  }, [liveTracking]);

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
  }, []);

  const handleLocationUpdate = (location) => {
    setUserLocation(location);
  };

  const handleCenterOnUser = () => {
    if (userLocation) {
      setCenterCoordinate([userLocation.coords.longitude, userLocation.coords.latitude]);
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

  useEffect(() => {
    if (updateCenter && userLocation) {
      setCenterCoordinate([userLocation.coords.longitude, userLocation.coords.latitude]);
      setUpdateCenter(false);
      handleCenterOnUser();
    }
  }, [userLocation, updateCenter]);

  const handleMarkerClick = (time, speed, index) => {
    setSelectedData({ time, speed });
    setCurrentIndex(index);
  };

  const handlePreviousDataPoint = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      handleMarkerClick(latLongValues.time[newIndex], latLongValues.speed[newIndex], newIndex);
    }
  };

  const handleNextDataPoint = () => {
    if (currentIndex < latLongValues.latLong.length - 1) {
      const newIndex = currentIndex + 1;
      handleMarkerClick(latLongValues.time[newIndex], latLongValues.speed[newIndex], newIndex);
    }
  };

  const handleCloseCard = () => {
    setSelectedData(null);
    setCurrentIndex(null);
  };

  return (
    <View style={styles.page}>
      {selectedData && (
        <View style={[styles.card, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
          <TouchableOpacity onPress={handlePreviousDataPoint}>
            <Text style={{ color: 'white', fontSize: 30 }}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={{ color: 'white', textAlign: 'center' }}>Time: {selectedData.time}</Text>
            <Text style={{ color: 'white', textAlign: 'center' }}>Speed: {selectedData.speed}</Text>
          </View>
          <TouchableOpacity onPress={handleNextDataPoint}>
            <Text style={{ color: 'white', fontSize: 30 }}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseCard}>
            <Text style={{ color: 'white', fontSize: 20 }}>X</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          styleURL={`https://avoin-karttakuva.maanmittauslaitos.fi/vectortiles/stylejson/v20/taustakartta.json?TileMatrixSet=WGS84_Pseudo-Mercator&api-key=${MAANMITTAUSLAITOS_API_KEY}`}
          centerCoordinate={centerCoordinate}
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
              centerCoordinate={centerCoordinate}
              zoomLevel={15}
              animationMode={'flyTo'}
              animationDuration={0}
            />
          )}
          <UserLocation animated={true} visible={true} onUpdate={handleLocationUpdate} />

          {latLongValues && (
            <Mapbox.ShapeSource id="lineSource" shape={{ type: 'LineString', coordinates: latLongValues.latLong }}>
              <Mapbox.LineLayer
                id="lineLayer"
                style={{
                  lineColor: 'red',
                  lineWidth: 2,
                }}
              />
            </Mapbox.ShapeSource>

          )}

          {latLongValues && latLongValues.latLong && latLongValues.latLong.map((coordinate, index) => (
            <Mapbox.PointAnnotation
              key={index}
              id={String(index)}
              coordinate={coordinate}
              onSelected={() => handleMarkerClick(latLongValues.time[index], latLongValues.speed[index], index)}
            >
              <View style={currentIndex === index ? styles.selectedPoint : styles.point} />
            </Mapbox.PointAnnotation>
          ))}


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
        <TouchableOpacity
          style={styles.centerOnUserButton}
          onPress={handleCenterOnUser}
        >
          <Text style={[styles.buttonTextForMarker, { color: themeColors.textColor }]}>
            Center on User
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
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Dimensions.get('window').height * 0.10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    zIndex: 1,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  point: {
    height: 10,
    width: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  selectedPoint: {
    height: 12.5,
    width: 12.5,
    backgroundColor: 'green',
    borderRadius: 7.5,
    zIndex: 1,
  },
  centerOnUserButton: {
    position: 'absolute',
    bottom: 60,
    right: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#858585',
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
    marginTop: 548,
    backgroundColor: '#858585',
  },
});

export default Map;
