import * as React from "react";
import { ILocation } from "./Views/Location";

interface ISelectedTrash {
  blue: boolean;
  yellow: boolean;
  black: boolean;
  brown: boolean;
  green: boolean;
}

interface AppState {
  location: ILocation;
  notificationTime: number;
  selectedTrash: ISelectedTrash;
}

interface IAction {
  type: "update";
  payload: Partial<AppState>;
}

type Dispatch = (action: IAction) => void;

const initialAppState = {
  location: {
    cityId: "",
    streetId: "",
  },
  notificationTime: 3600, // TODO provide useful default state in ms
  selectedTrash: {
    blue: true,
    yellow: true,
    black: true,
    brown: true,
    green: true,
  },
};

const AppContext = React.createContext<
  { state: AppState; dispatch: Dispatch } | undefined
>(undefined);

function appReducer(state: AppState, action: IAction) {
  switch (action.type) {
    case "update": {
      return { ...state, ...action.payload };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(appReducer, initialAppState);

  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

function useAppState() {
  const context = React.useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppState must be used within a AppProvider");
  }

  return context;
}

export { AppProvider, useAppState };
