import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState, initialAppState } from "../components/AppContext";

export const appStateToLocalStorage = async (config: AppState) => {
  try {
    const jsonConfig = JSON.stringify(config);
    await AsyncStorage.setItem("@storage_app_config", jsonConfig);
  } catch (e) {
    console.log("Error ", e);
    console.log("Couldn 't save config to local storage");
  }
};

export const localStorageToAppState = async () => {
  try {
    const jsonConfig = await AsyncStorage.getItem("@storage_app_config");
    return jsonConfig != null ? JSON.parse(jsonConfig) : initialAppState;
  } catch (e) {
    console.log("Error ", e);
    console.log("Couldn't get config for localstorage");
  }
};
