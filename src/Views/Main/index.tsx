import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../../../App";

type ProfileScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "Profile"
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export const Main: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.push("Profile")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
