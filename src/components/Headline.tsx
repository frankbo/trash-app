import React from "react";
import { fontSizes } from "../lib/font";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "grey",
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "center",
    borderBottomColor: "lightgrey",
    borderStyle: "solid",
    borderBottomWidth: 1,
    fontSize: fontSizes.m,
  },
});

export const Headline: React.FC = ({ children }) => {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};
