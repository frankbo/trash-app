import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, View } from "react-native";
import { AppScreens, StackParamList } from "../../../App";

type ProfileScreenNavigationProp = StackNavigationProp<
  StackParamList,
  AppScreens.Location
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const Location: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <View>Wo wohnst du?</View>
      <Button
        onPress={() => navigation.replace(AppScreens.Main)}
        title="Weiter"
      />
    </View>
  );
};
