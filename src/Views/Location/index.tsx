import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { Headline } from "../../components/Headline";
import { CityAndStreetPicker } from "../../components/CityAndStreetPicker";
import { AppScreens, RootStackParamList } from "../../../App";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  AppScreens.Location
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export interface ILocation {
  cityId: string;
  streetId: string;
}

export const Location: React.FC<Props> = ({ navigation }) => {
  const [isDisabled, setDisabled] = useState(true);

  return (
    <View style={styles.container}>
      <Headline>Wähle Deinen Standort</Headline>
      <CityAndStreetPicker setDisabled={setDisabled} />
      <View style={styles.button}>
        <Button
          disabled={isDisabled}
          onPress={() => navigation.replace(AppScreens.Main)}
          title="Weiter"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 30,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
  },
});
