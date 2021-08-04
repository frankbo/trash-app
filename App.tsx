import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Main } from "./src/Views/Main";
import { Profile } from "./src/Views/Profile";
import { Location } from "./src/Views/Location";
import { Loading } from "./src/Views/Loading";
import Icon from "react-native-vector-icons/FontAwesome";
import { AppProvider } from "./src/components/AppContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { localStorageToContext } from "./src/hooks/appConfig";
import { AppScreens, RootStackParamList } from "./src/@types/app";

const Stack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();
const title = "Abfall App";

const Navigator: React.FC = () => {
  const state = localStorageToContext();
  return (
    <Stack.Navigator>
      {state.loading ? (
        <Stack.Screen
          name="Loading"
          options={{ title, headerTitleAlign: "center" }}
          component={Loading}
        />
      ) : state.location.cityId === "" ? (
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
        // TODO fix if arrow back is not showing up anymore.
        // options={({ navigation }) => ({
        //   title,
        //   headerTitleAlign: "center",
        //   headerLeft: (
        //     <Icon.Button
        //       name="arrow-left"
        //       onPress={() => {
        //         navigation.goBack();
        //       }}
        //       color="black"
        //       backgroundColor="transparent"
        //       underlayColor="transparent"
        //       size={24}
        //     />
        //   ),
        // })}
      />
    </Stack.Navigator>
  );
};

// TODO bring in notifications from react-native-ntotifications and maybe with the midnight library
// to send them out once per day.
export default function App() {
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
