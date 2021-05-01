import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CityAndStreetPicker } from "../../components/CityAndStreetPicker";
import { GarbageType } from "../../components/GarbageType";
import { Headline } from "../../components/Headline";

export const Profile: React.FC = () => {
  const [isDisabled, setDisabled] = useState(true); //TODO disable when nothing nothing got picked and show modal

  return (
    <View style={styles.container}>
      <Headline>Ändere deinen Standort</Headline>
      <CityAndStreetPicker setDisabled={setDisabled} />
      <Headline>Müllarten</Headline>
      <GarbageType />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
});
