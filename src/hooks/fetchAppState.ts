import { useQuery } from "react-query";
import { AppState, useAppState } from "../components/AppContext";
import { localStorageToAppState } from "../lib/localStorage";

export const fetchFromLocalStorage = () => {
  const { dispatch } = useAppState();

  return useQuery<AppState, Error>("localStorage", localStorageToAppState, {
    onSuccess: (state) =>
      state &&
      dispatch({
        type: "update",
        payload: { ...state },
      }),
  });
};
