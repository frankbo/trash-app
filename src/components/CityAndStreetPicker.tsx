import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAppState } from "./AppContext";

const badBerleburgId = "1746.18";
const cities = [
  { id: "", name: "Bitte wählen" },
  { id: "1746.1", name: "Alertshausen" },
  { id: "1746.2", name: "Arfeld" },
  { id: "1746.21", name: "Aue" },
  { id: badBerleburgId, name: "Bad Berleburg" },
  { id: "1746.23", name: "Beddelhausen" },
  { id: "1746.17", name: "Berghausen" },
  { id: "1746.13", name: "Christianseck" },
  { id: "1746.14", name: "Diedenshausen" },
  { id: "1746.3", name: "Dotzlar" },
  { id: "1746.11", name: "Elsoff" },
  { id: "1746.5", name: "Girkhausen" },
  { id: "1746.12", name: "Hemschlar" },
  { id: "1746.24", name: "Müsse" },
  { id: "1746.20", name: "Raumland" },
  { id: "1746.19", name: "Richstein" },
  { id: "1746.4", name: "Rinthe" },
  { id: "1746.8", name: "Sassenhausen" },
  { id: "1746.7", name: "Schüllar" },
  { id: "1746.16", name: "Schwarzenau" },
  { id: "1746.6", name: "Stünzel" },
  { id: "1746.15", name: "Weidenhausen" },
  { id: "1746.9", name: "Wemlighausen" },
  { id: "1746.22", name: "Wingeshausen" },
  { id: "1746.10", name: "Wunderthausen" },
];

const badBerleburgStreet = [
  { id: "", name: "Bitte wählen" },
  { id: "1746.42.1", name: "am breitenbach" },
  { id: "1746.39.1", name: "Am Gehre" },
  { id: "1746.46.1", name: "Am Seifchen" },
  { id: "1746.45.1", name: "An der Gontardslust" },
  { id: "1746.44.1", name: "An der Odebornskirche" },
  { id: "1746.36.1", name: "Astenbergstraße" },
  { id: "1746.49.1", name: "Corneliusweg" },
  { id: "1746.34.1", name: "Ederstraße" },
  { id: "1746.43.1", name: "Espeweg" },
  { id: "1746.41.1", name: "Fohlenweg" },
  { id: "1746.50.1", name: "Franz-von-Winckel-Weg" },
  { id: "1746.48.1", name: "Herrenwiese" },
  { id: "1746.47.1", name: "Hillerbachweg" },
  { id: "1746.40.1", name: "Marienburger Straße" },
  { id: "1746.32.1", name: "östlich der B480" },
  { id: "1746.35.1", name: "Poststraße" },
  { id: "1746.38.1", name: "Sählingstraße" },
  { id: "1746.33.1", name: "westlich der B480" },
];

interface Props {
  setDisabled: (disableState: boolean) => void;
}

export const CityAndStreetPicker: React.FC<Props> = ({ setDisabled }) => {
  const { state, dispatch } = useAppState();
  const { location } = state;

  return (
    <View>
      <Picker
        style={styles.picker}
        selectedValue={location.cityId}
        onValueChange={(cityId) => {
          dispatch({
            type: "update",
            payload: { location: { cityId, streetId: "" } },
          });
          setDisabled(cityId === badBerleburgId || cityId === "");
        }}
      >
        {cities.map((v, idx) => {
          return <Picker.Item key={idx} label={v.name} value={v.id} />;
        })}
      </Picker>
      {location.cityId === badBerleburgId && (
        <Picker
          style={styles.picker}
          selectedValue={location.streetId}
          onValueChange={(streetId) => {
            dispatch({
              type: "update",
              payload: { location: { cityId: badBerleburgId, streetId } },
            });
            setDisabled(streetId === "");
          }}
        >
          {badBerleburgStreet.map((v, idx) => {
            return <Picker.Item key={idx} label={v.name} value={v.id} />;
          })}
        </Picker>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    fontSize: 20,
    color: "grey",
    height: 50,
    marginVertical: 8,
    marginHorizontal: 8,
  },
});
