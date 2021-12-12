import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import VendorMain from "./pages/VendorMain";
import VendorUpdateFoodQty from "./pages/VendorUpdateFoodQty";

export default function App() {
  return <VendorUpdateFoodQty />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
