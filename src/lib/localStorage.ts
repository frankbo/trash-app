import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "../components/AppContext";

export const setAppConfig = async (config: AppState) => {
  try {
    const jsonConfig = JSON.stringify(config);
    await AsyncStorage.setItem("@storage_app_config", jsonConfig);
  } catch (e) {
    console.log("Error ", e);
    console.log("Couldn 't save config to local storage");
  }
};

export const getAppConfig = async () => {
  try {
    const jsonConfig = await AsyncStorage.getItem("@storage_app_config");
    return jsonConfig != null ? JSON.parse(jsonConfig) : null;
  } catch (e) {
    console.log("Error ", e);
    console.log("Couldn't get config for localstorage");
  }
};
