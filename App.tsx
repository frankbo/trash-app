import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Main } from "./src/Views/Main";
import { Profile } from "./src/Views/Profile";

export type StackParamList = {
  Main: undefined;
  Profile: undefined;
};
const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ title: "Trash App" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Trash App" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
