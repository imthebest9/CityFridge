import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
import HeaderTabsVendor from "../components/vendor/HeaderTabsVendor";
import Reservations from "../components/vendor/Reservations";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";

export default function VendorMain() {
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
  const [activeTab, setActiveTab] = useState("Reservation");
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.header}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Merriweather_900Black",
            }}
          >
            Your Store
          </Text>
          <View style={{ backgroundColor: "white", padding: 15 }}>
            <HeaderTabsVendor
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </View>
        </View>
        <View style={{ flex: 7 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Reservations />
          </ScrollView>
        </View>
        {/* Confirm Order Button */}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#4EB574",
              paddingVertical: 13,
              paddingHorizontal: 70,
              borderRadius: 30,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Merriweather_400Regular",
                color: "white",
              }}
            >
              Confirm Order
            </Text>
          </TouchableOpacity>
        </View>

        <BottomTabsVendor />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingTop: 40,
    flex: 1,
  },
});
