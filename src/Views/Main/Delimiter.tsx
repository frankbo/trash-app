import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { fontSizes } from "../../lib/font";

interface Props {
  date: Date;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "center",
    borderBottomColor: "lightgrey",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  text: {
    color: "grey",
    fontSize: fontSizes.m,
  },
});

export const Delimiter: React.FC<Props> = ({ date }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}`}</Text>
    </View>
  );
};
