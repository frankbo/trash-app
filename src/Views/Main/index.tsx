import React from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import data from "../../../mocks/example-calendar.json";
import colors from "../../lib/colors";
import Icon from "react-native-vector-icons/FontAwesome";
/**
 * Backend related Code
 */
const getTimestamp = (weirdDate: string): number =>
  new Date(
    weirdDate.substring(0, 4) +
      "-" +
      weirdDate.substring(4, 6) +
      "-" +
      weirdDate.substr(6, weirdDate.length)
  ).getTime();

const DATA: Item[] = data.vcalendar[0].vevent
  .map((v) => ({ ...v, dtstart: getTimestamp(v.dtstart[0] as string) }))
  .sort((a, b) => a.dtstart - b.dtstart)
  .map((v) => {
    if (v.summary.toLowerCase().includes("bio")) {
      return { ...v, kind: "brown" };
    }
    if (v.summary.toLowerCase().includes("papier")) {
      return { ...v, kind: "blue" };
    }
    if (v.summary.toLowerCase().includes("gelbe")) {
      return { ...v, kind: "yellow" };
    }
    if (v.summary.toLowerCase().includes("rest")) {
      return { ...v, kind: "black" };
    }
    if (v.summary.toLowerCase().includes("sperrige")) {
      return { ...v, kind: "green" };
    }
    return { ...v, kind: undefined };
  });

/**
 * End of backend
 */

interface Item {
  categories: string;
  location: string;
  summary: string;
  uid: string;
  class: string;
  dtstart: number;
  dtstamp: string;
  description: string;
  kind: "blue" | "yellow" | "green" | "black" | "brown" | undefined;
}

const RenderItem: ListRenderItem<Item> = ({ item }) => {
  const date = new Date(item.dtstart);
  return (
    <View style={setItemStyles({ kind: item.kind }).item}>
      <Text>
        <Icon name="trash" size={30} color="black" />
        <Text>{item.summary}</Text>
      </Text>
      <Text>{`${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}`}</Text>
    </View>
  );
};

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

const setItemStyles = ({ kind }: Pick<Item, "kind">) => {
  const itemColor =
    kind === "blue"
      ? colors.blue
      : kind === "yellow"
      ? colors.yellow
      : kind === "green"
      ? colors.green
      : kind === "black"
      ? colors.black
      : kind === "brown"
      ? colors.brown
      : "white";
  return StyleSheet.create({
    item: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: itemColor,
      justifyContent: "space-between",
      paddingHorizontal: 6,
      paddingVertical: 8,
      marginHorizontal: 6,
      marginVertical: 4,
      borderRadius: 4,
    },
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
});
