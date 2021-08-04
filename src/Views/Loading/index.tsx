import React from "react";
import { ActivityIndicator, View } from "react-native";

export const Loading: React.FC = () => (
  <View>
    <ActivityIndicator size="large" />
  </View>
);
