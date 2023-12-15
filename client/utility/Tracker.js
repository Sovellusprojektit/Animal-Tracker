import {TRACTIVE_EMAIL, TRACTIVE_PASSWORD, TRACKER_ID, PET_ID } from '@env';
import {connect, isAuthenticated, getTrackerLocation, liveOn, liveOff, getTrackerHistory, BuzzerOff,BuzzerOn, LEDOn, LEDOff, getPets, getPet } from 'tractive';


export const connectTracker = async () => {
  try {
    const connected = await connect(TRACTIVE_EMAIL.toString(), TRACTIVE_PASSWORD.toString());

    if (connected) {
      console.log("Connected to Tractive");
      console.log(await isAuthenticated());
      return true;
    } else {
      console.log("Could not connect to Tractive");
      return false;
    }
  } catch (error) {
    console.error("Error while connecting to Tractive: " + error);
  }
}

export const getAnimalLocation = async () => {
  try {
    const location = await getTrackerLocation(TRACKER_ID.toString());
    console.log(location.latlong);
    return location.latlong;
  } catch (error) {
    console.error("Error while getting location: " + error);
  }
}

export const liveTrackingOn = async () => {
  try {
    const live = await liveOn(TRACKER_ID.toString());
    console.log("Live tracking on: ");
    console.log(live);
    return live;
  } catch (error) {
    console.error("Error while turning live tracking on: " + error);
  }
};

export const liveTrackingOff = async () => {
  try {
    const live = await liveOff(TRACKER_ID.toString());
    console.log("Live tracking off: ");
    console.log(live);
    return live;
  } catch (error) {
    console.error("Error while turning live tracking off: " + error);
  }
};

export const getHistory = async (startDate, endDate) => {
  try {
    const history = await getTrackerHistory(TRACKER_ID.toString(), startDate, endDate);
    console.log("History: ");
    console.log(history);
    return history;
  } catch (error) {
    console.error("Error while getting history: " + error);
    throw error; 
  }
}

export const buzzerOn = async () => {
  try {
    const buzzer = await BuzzerOn(TRACKER_ID.toString());
    console.log("Buzzer on: ");
    console.log(buzzer);
    return buzzer;
  } catch (error) {
    console.error("Error while turning buzzer on: " + error);
  }
};

export const buzzerOff = async () => {
  try {
    const buzzer = await BuzzerOff(TRACKER_ID.toString());
    console.log("Buzzer off: ");
    console.log(buzzer);
    return buzzer;
  } catch (error) {
    console.error("Error while turning buzzer off: " + error);
  }
};

export const ledOn = async () => {
  try {
    const led = await LEDOn(TRACKER_ID.toString());
    console.log("LED on: ");
    console.log(led);
    return led;
  } catch (error) {
    console.error("Error while turning LED on: " + error);
  }
};
 export const ledOff = async () => {
  try {
    const led = await LEDOff(TRACKER_ID.toString());
    console.log("LED off: ");
    console.log(led);
    return led;
  } catch (error) {
    console.error("Error while turning LED off: " + error);
  } 
};

export const getPetData = async () => {
  try {
    const pets = await getPets();
    console.log("Pet Data:", pets);
    return pets;
  } catch (error) {
    console.error("Error while getting pet data: " + error);
  }
};

export const getPetDetails = async () => {
  try {
    const pet = await getPet(PET_ID.toString());
    return pet;
  } catch (error) {
    console.error("Error while getting pet details: " + error);
  }
};
