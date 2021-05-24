import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Main } from "./src/Views/Main";
import { Profile } from "./src/Views/Profile";
import { Location } from "./src/Views/Location";
import Icon from "react-native-vector-icons/FontAwesome";
import { AppProvider } from "./src/components/AppContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { localStorageToContext } from "./src/hooks/appConfig";
import { AppScreens, RootStackParamList } from "./src/@types/app";
import {
  createDefaultChannel,
  scheduleNotification,
} from "./src/lib/notificationHandler";
import { useOnDayChange } from "react-native-midnight";

const Stack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();
const title = "Abfall App";

const Navigator: React.FC = () => {
  const state = localStorageToContext();
  useOnDayChange(scheduleNotification);

  return (
    <Stack.Navigator>
      {state.location.cityId === "" ? (
        <Stack.Screen
          name={AppScreens.Location}
          options={{ title, headerTitleAlign: "center" }}
          component={Location}
        />
      ) : (
        <Stack.Screen
          name={AppScreens.Main}
          component={Main}
          options={({ navigation }) => ({
            title,
            headerTitleAlign: "center",
            headerRight: () => (
              <Icon.Button
                name="cog"
                onPress={() => navigation.push(AppScreens.Profile)}
                color="black"
                backgroundColor="transparent"
                underlayColor="transparent"
                size={24}
              />
            ),
          })}
        />
      )}
      <Stack.Screen
        name={AppScreens.Profile}
        component={Profile}
        options={{ title, headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    createDefaultChannel();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </AppProvider>
    </QueryClientProvider>
  );
}
