import { useEffect } from "react";
import { useAppState } from "../components/AppContext";
import { localStorageToAppState } from "../lib/localStorage";

export const localStorageToContext = () => {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    localStorageToAppState().then(
      (config) => config && dispatch({ type: "update", payload: { ...config } })
    );
  }, []);

  return state;
};
