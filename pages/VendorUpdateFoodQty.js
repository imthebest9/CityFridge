import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import FoodQuantityUpdate from "../components/vendor/FoodQuantityUpdate";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";

export default function VendorUpdateFoodQty() {
  return (
    <View style={{ backgroundColor: "#fff", paddingTop: 40, flex: 1 }}>
      <View style={{ flex: 2, marginTop: 20 }}>
        <FoodQuantityUpdate />
      </View>
      <BottomTabsVendor />
    </View>
  );
}
