import {TRACTIVE_EMAIL, TRACTIVE_PASSWORD, TRACKER_ID } from '@env';
import {connect, isAuthenticated, getTrackerLocation} from 'tractive';


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




