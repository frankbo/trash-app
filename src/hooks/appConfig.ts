import { useEffect } from "react";
import { useAppState } from "../components/AppContext";
import { getAppConfig } from "../lib/localStorage";

export const localStorageToContext = () => {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    getAppConfig().then((config) =>
      dispatch({ type: "update", payload: { ...config } })
    );
  }, []);

  return state;
};
