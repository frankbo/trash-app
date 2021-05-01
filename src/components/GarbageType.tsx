import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppState } from "./AppContext";
import CheckBox from "@react-native-community/checkbox";

export const GarbageType: React.FC = () => {
  const { state, dispatch } = useAppState();
  const { selectedTrash } = state;

  return (
    <View>
      {selectedTrash.map((trash, idx) => {
        return (
          <View key={idx} style={styles.innerContainer}>
            <CheckBox
              value={trash.isChecked}
              onValueChange={(newValue) => {
                const selectedTrash = Object.assign([], state.selectedTrash, {
                  [idx]: {
                    ...state.selectedTrash[idx],
                    isChecked: newValue,
                  },
                });

                dispatch({ type: "update", payload: { selectedTrash } });
              }}
            />
            <Text style={styles.checkerText}>{trash.value}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  checkerText: {
    fontSize: 20,
    color: "grey",
    marginVertical: 8,
    marginHorizontal: 8,
  },
});
