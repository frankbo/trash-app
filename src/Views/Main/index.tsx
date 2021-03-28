import React from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import data from "../../../mocks/example-calendar.json";
/**
 * Backend related Code
 */
const getTimestamp = (weirdDate: string) =>
  new Date(
    weirdDate.substring(0, 4) +
      "-" +
      weirdDate.substring(4, 6) +
      "-" +
      weirdDate.substr(6, weirdDate.length)
  ).getTime();

const DATA = data.vcalendar[0].vevent.sort(
  (a, b) =>
    getTimestamp(a.dtstart[0] as string) - getTimestamp(b.dtstart[0] as string)
);

/**
 * End of backend
 */

interface Item {
  categories: string;
  location: string;
  summary: string;
  uid: string;
  class: string;
  dtstart: (
    | string
    | {
        value: string;
      }
  )[];
  dtstamp: string;
  description: string;
}

const RenderItem: ListRenderItem<Item> = ({ item }) => (
  <View style={styles.item}>
    <Text>{item.summary}</Text>
    <Text>{item.dtstart[0]}</Text>
  </View>
);

export const Main: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={RenderItem}
        keyExtractor={(item) => item.uid}
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
  item: {
    flex: 1,
    backgroundColor: "#4287f5",
    justifyContent: "center",
    margin: 4,
  },
});
