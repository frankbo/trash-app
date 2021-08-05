import { useQuery } from "react-query";
import { AppState, useAppState } from "../components/AppContext";
import { localStorageToAppState } from "../lib/localStorage";

export const localStorageToContext = () => {
  const { dispatch } = useAppState();

  return useQuery<AppState, Error>("localStorage", localStorageToAppState, {
    onSuccess: (config) =>
      config &&
      dispatch({
        type: "update",
        payload: { ...config },
      }),
  });
};
