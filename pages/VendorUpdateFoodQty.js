import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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
import FoodQuantityUpdate from "../components/vendor/FoodQuantityUpdate";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";

export default function VendorUpdateFoodQty() {
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
      <View style={{ backgroundColor: "#fff", paddingTop: 40, flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Merriweather_400Regular",
                  color: "#349F5C",
                  marginLeft: 25,
                  marginTop: 5,
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 24, fontFamily: "Merriweather_900Black" }}>
              Your store
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text></Text>
          </View>
        </View>
        <View style={{ marginTop: 30, marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Merriweather_700Bold",
              margin: 20,
            }}
          >
            Update Food Quality
          </Text>
        </View>
        <View style={{ flex: 2, marginTop: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FoodQuantityUpdate />
          </ScrollView>
        </View>
        <View style={{ flex: 1, marginTop: 50, alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#4EB574",
              paddingVertical: 13,
              paddingHorizontal: 110,
              borderRadius: 30,
              margin: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Merriweather_400Regular",
                color: "white",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <BottomTabsVendor />
      </View>
    );
  }
}
