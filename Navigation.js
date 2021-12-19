import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import VendorMain from "./pages/VendorMain";
import VendorConfirmOrder from "./pages/VendorConfirmOrder";
import VendorUpdateFoodQty from "./pages/VendorUpdateFoodQty";
import VendorNewFoodType from "./pages/VendorNewFoodType";
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
            headerStyle: { backgroundColor: "#116530", elevation: 0 },
            headerTintColor: "#fff",
            headerTitleStyle: { fontSize: 24, fontFamily:"Merriweather_700Bold" },
          }}
          initialRouteName="Sign In"
        >
          <Stack.Screen
            name="Sign In"
            component={SignIn}
            initialParams={{ styles }}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Sign Up")}
                >
                  <Text style={[styles.buttonText, { margin: 10 }]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUp}
            initialParams={{ styles, componentWidth }}
          />
          <Stack.Screen
            name="Profile"
            component={UserProfile}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Sign In")}
                >
                  <Text style={[styles.buttonText, { margin: 10 }]}>
                    Sign Out
                  </Text>
                </TouchableOpacity>
              ),
            })}
          />
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const width = Dimensions.get("screen").width;
export const componentWidth = width * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 1,
    alignItems: "center",
    width: componentWidth,
  },
  textInput: {
    flexDirection: "row",
    backgroundColor: "#f6f6f6",
    borderRadius: 5,
    padding: 10,
    margin: 7,
    width: "100%",
    color: "#000",
    fontSize: 16,
    fontFamily: "MerriweatherSans_400Regular"
  },
  button: {
    backgroundColor: "#4EB574",
    borderRadius: 50,
    padding: 10,
    margin: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Merriweather_400Regular"
  },
  logo: {
    margin: 20,
    height: width * 0.3,
  },
});
