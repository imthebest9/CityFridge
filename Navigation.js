import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { signOut } from "firebase/auth";
import { auth } from "./firebase";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Taddcart from "./pages/Taddcart";
import UserSetting from "./pages/UserSetting";
import UserProfile from "./pages/UserProfile";
import UserHistory from "./pages/UserHistory";
import VendorMain from "./pages/VendorMain";
import VendorConfirmOrder from "./pages/VendorConfirmOrder";
import VendorUpdateFoodQty from "./pages/VendorUpdateFoodQty";
import VendorNewFoodType from "./pages/VendorNewFoodType";
import SearchStorePage from "./pages/SearchStorePage";
import {
  useFonts,
  Merriweather_300Light,
  Merriweather_300Light_Italic,
  Merriweather_400Regular,
  Merriweather_400Regular_Italic,
  Merriweather_700Bold,
  Merriweather_700Bold_Italic,
  Merriweather_900Black,
  Merriweather_900Black_Italic,
} from "@expo-google-fonts/merriweather";
import {
  MerriweatherSans_300Light,
  MerriweatherSans_400Regular,
  MerriweatherSans_500Medium,
  MerriweatherSans_600SemiBold,
  MerriweatherSans_700Bold,
  MerriweatherSans_800ExtraBold,
  MerriweatherSans_300Light_Italic,
  MerriweatherSans_400Regular_Italic,
  MerriweatherSans_500Medium_Italic,
  MerriweatherSans_600SemiBold_Italic,
  MerriweatherSans_700Bold_Italic,
  MerriweatherSans_800ExtraBold_Italic,
} from "@expo-google-fonts/merriweather-sans";
import AppLoading from "expo-app-loading";
import StorePage from "./pages/StorePage";
import Stores from "./components/Search/Stores";

const Stack = createStackNavigator();

export default function Navigation() {
  let [fontsLoaded] = useFonts({
    Merriweather_300Light,
    Merriweather_300Light_Italic,
    Merriweather_400Regular,
    Merriweather_400Regular_Italic,
    Merriweather_700Bold,
    Merriweather_700Bold_Italic,
    Merriweather_900Black,
    Merriweather_900Black_Italic,
    MerriweatherSans_300Light,
    MerriweatherSans_400Regular,
    MerriweatherSans_500Medium,
    MerriweatherSans_600SemiBold,
    MerriweatherSans_700Bold,
    MerriweatherSans_800ExtraBold,
    MerriweatherSans_300Light_Italic,
    MerriweatherSans_400Regular_Italic,
    MerriweatherSans_500Medium_Italic,
    MerriweatherSans_600SemiBold_Italic,
    MerriweatherSans_700Bold_Italic,
    MerriweatherSans_800ExtraBold_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#116530", elevation: 0 },
            headerTitleStyle: {
              fontSize: 18,
              fontFamily: "Merriweather_700Bold",
            },
          }}
          initialRouteName="Sign In"
        >
          <Stack.Screen
            name="Sign In"
            component={SignIn}
            options={({ navigation }) => ({
              headerLeft: null,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Sign Up")}
                >
                  <Text style={[styles.headerText, { margin: 10 }]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen
            name="Profile"
            component={UserProfile}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Setting")}
                >
                  <Text style={[styles.headerText, { margin: 10 }]}>
                    Settings
                  </Text>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    signOut(auth)
                      .then(() => {
                        navigation.dispatch(StackActions.replace("Sign In"));
                      })
                      .catch((error) => {
                        alert(error.message);
                      });
                  }}
                >
                  <Text style={[styles.headerText, { margin: 10 }]}>
                    Sign Out
                  </Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="History"
            component={UserHistory}
            options={{
              headerTintColor: "black",
              headerStyle: { backgroundColor: "white", elevation: 0 },
              headerTitleStyle: {
                fontSize: 24,
                fontFamily: "Merriweather_700Bold",
              },
            }}
          />
          <Stack.Screen name="Setting" component={UserSetting} />
          <Stack.Screen name="Your Store" component={VendorMain} />
          <Stack.Screen name="Confirm Order" component={VendorConfirmOrder} />
          <Stack.Screen
            name="Update Food Quantity"
            component={VendorUpdateFoodQty}
          />
          <Stack.Screen
            name="Add New Food Type"
            component={VendorNewFoodType}
          />
          <Stack.Screen name="Kingsbay Hypermarket" component={StorePage} />
          <Stack.Screen name="Home Page" component={SearchStorePage} />
          <Stack.Screen name="Taddcart" component={Taddcart} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Merriweather_400Regular",
  },
});
