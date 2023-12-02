import {TRACTIVE_EMAIL, TRACTIVE_PASSWORD, TRACKER_ID } from '@env';
import {connect, isAuthenticated, getTrackerLocation, liveOn, liveOff, getTrackerHistory} from 'tractive';


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





