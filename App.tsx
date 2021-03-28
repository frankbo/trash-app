import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Button } from "react-native";
import "react-native-gesture-handler";
import { Main } from "./src/Views/Main";
import { Profile } from "./src/Views/Profile";

export type StackParamList = {
  Main: undefined;
  Profile: undefined;
};

export enum AppScreens {
  Main = "Main",
  Profile = "Profile",
}

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name={AppScreens.Main}
          component={Main}
          options={({ navigation }) => ({
            title: "Trash App",
            headerTitleAlign: "center",
            headerRight: () => (
              <Button onPress={() => navigation.push("Profile")} title="test" />
            ),
          })}
        />
        <Stack.Screen
          name={AppScreens.Profile}
          component={Profile}
          options={{ title: "Trash App", headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
