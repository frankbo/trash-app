import * as React from "react";
import { ILocation } from "../Views/Location";

export interface ITrash {
  id: string;
  value: string;
  isChecked: boolean;
}

export interface AppState {
  location: ILocation;
  notifyBefore: number;
  selectedTrash: ITrash[];
}

interface IAction {
  type: "update";
  payload: Partial<AppState>;
}

type Dispatch = (action: IAction) => void;

const sixteenHours = 57600000;
export const initialAppState: AppState = {
  location: {
    cityId: "",
    streetId: "",
  },
  notifyBefore: sixteenHours,
  selectedTrash: [
    { id: "1.2", value: "Biomüll", isChecked: true },
    { id: "1746.1", value: "Gelbe Tonne", isChecked: true },
    { id: "1.6", value: "Papiermüll", isChecked: true },
    { id: "1.1", value: "Restmüll", isChecked: true },
    { id: "1.5", value: "Schadstoffsammlung", isChecked: true },
    { id: "1.4", value: "Sperrige Grünabfälle", isChecked: true },
  ],
};

const AppContext =
  React.createContext<{ state: AppState; dispatch: Dispatch } | undefined>(
    undefined
  );

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
