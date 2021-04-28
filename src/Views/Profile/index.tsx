import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CityAndStreetPicker } from "../../components/CityAndStreetPicker";
import { Headline } from "../../components/Headline";

export const Profile = ({ navigation }) => {
  const [isDisabled, setDisabled] = useState(true);
  useLayoutEffect(() => {
    navigation.setOptions({ isDisabled });
  }, [navigation, isDisabled]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Headline>Ändere Deinen Standort</Headline>
        <CityAndStreetPicker setDisabled={setDisabled} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
});
