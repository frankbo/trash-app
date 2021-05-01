import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CityAndStreetPicker } from "../../components/CityAndStreetPicker";
import { Headline } from "../../components/Headline";

export const Profile: React.FC = () => {
  const [isDisabled, setDisabled] = useState(true);

  return (
    <View style={styles.container}>
      <Headline>Ändere deinen Standort</Headline>
      <CityAndStreetPicker setDisabled={setDisabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
});
