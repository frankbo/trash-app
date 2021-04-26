import React from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import colors from "../../lib/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { useQuery } from "react-query";
import transformEvent from "../../lib/transformCalendarEvent";
import { useAppState } from "../../AppContext";
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
  const context = useAppState();
  const { cityId, streetId } = context.state.location;
  const baseUrL = "https://www.bad-berleburg.de/output/abfall_export.php";
  const url = `${baseUrL}?csv_export=1&mode=vcal&ort=${cityId}&strasse=${
    streetId ? streetId : cityId
  }&1vJ=2021`; // Parameter vMo (von Monat) and bMo (bis Monat) might be helpful here at some point
  const query = useQuery<Item[], Error>("calData", () =>
    fetch(url)
      .then((res) => res.text())
      .then((txt) => transformEvent(txt))
  );

  if (query.isLoading) return <Text>"Loading..."</Text>;

  if (query.error) {
    console.log("An error has occurred: " + query.error);
    return null;
  }

  if (!query.data) return null;

  return (
    <View style={styles.container}>
      <FlatList
        data={query.data}
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
