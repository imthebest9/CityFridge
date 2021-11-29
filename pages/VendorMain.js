import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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
import AppLoading from "expo-app-loading";
import HeaderTabsVendor from "../components/vendor/HeaderTabsVendor";

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
  });
  const [activeTab, setActiveTab] = useState("Reservation");
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Merriweather_900Black",
          }}
        >
          Your Store
        </Text>
        <View style={{ backgroundColor: "white", padding: 15 }}>
          <HeaderTabsVendor activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
});