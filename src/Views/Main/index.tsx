import React from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import colors from "../../lib/colors";
import { Delimiter } from "../../components/Delimiter";
import { fetchAndTranslate } from "../../hooks/fetchAndTranslate";
export interface Item {
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

let prevDate = null;
const renderDelimiter = (date: Date) => {
  const element =
    prevDate?.getTime() !== date.getTime() ? <Delimiter date={date} /> : null;
  prevDate = date;
  return element;
};

const RenderItem: ListRenderItem<Item> = ({ item }) => {
  const date = new Date(item.dtstart);

  return (
    <View>
      {renderDelimiter(date)}
      <View style={styles.item}>
        <View style={setItemStyles({ kind: item.kind }).icon} />
        <Text style={styles.itemText}>{item.summary}</Text>
      </View>
    </View>
  );
};

export const Main: React.FC = () => {
  const items = fetchAndTranslate();

  if (items.length < 1) return null;

  const futureEvents = items.filter(
    (v) => v.dtstart >= new Date(new Date().setHours(0, 0, 0, 0)).getTime()
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={futureEvents}
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
    icon: {
      height: 30,
      width: 30,
      backgroundColor: itemColor,
      borderRadius: 4,
    },
  });
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  itemText: {
    fontSize: 20,
    marginLeft: 16,
    color: "grey",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
});
