import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const LoadingIndicator: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator color="#0000ff" size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});