import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import "react-native-gesture-handler";
import { Main } from "./src/Views/Main";
import { Profile } from "./src/Views/Profile";
import { Location } from "./src/Views/Location";
import Icon from "react-native-vector-icons/FontAwesome";
import { AppScreens, StackParamList } from "./src/lib/app";
import { AppProvider } from "./src/AppContext";
import { QueryClient, QueryClientProvider } from "react-query";

const Stack = createStackNavigator<StackParamList>();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={AppScreens.Location}>
            <Stack.Screen
              name={AppScreens.Location}
              options={{ title: "Trash App", headerTitleAlign: "center" }}
              component={Location}
            />
            <Stack.Screen
              name={AppScreens.Main}
              component={Main}
              options={({ navigation }) => ({
                title: "Trash App",
                headerTitleAlign: "center",
                headerRight: () => (
                  <Icon.Button
                    name="cog"
                    onPress={() => navigation.push(AppScreens.Profile)}
                    color="black"
                    backgroundColor="none"
                    size={32}
                  />
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
      </AppProvider>
    </QueryClientProvider>
  );
}
