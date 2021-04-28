import React from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import colors from "../../lib/colors";
import { useQuery } from "react-query";
import transformEvent from "../../lib/transformCalendarEvent";
import { useAppState } from "../../AppContext";
import { Delimiter } from "../../components/Delimiter";
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
    console.log("An error has occurred while querying: " + query.error);
    return <Text>"An Error occured"</Text>;
  }

  if (!query.data) return null;

  const futureEvents = query.data.filter(
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
