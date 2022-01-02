import React from "react";
import { View, Text } from "react-native";
import VpickupTime from "../components/Transaction/GenerateTac";
import VreserveButton from "../components/Transaction/VreserveButton";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";

export default function Tviewcart() {
  // const{title, price} = item;

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          backgroundColor: "#4EB574",
          fontSize: 21,
          marginTop: 25,
          textAlign: "center",
        }}
      >
        Kingsbay Restaurant
      </Text>
      <Text
        style={{
          marginTop: 20,
          marginHorizontal: 15,
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {" "}
        🛒 Basket
      </Text>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#999",
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 16 }}>Apple</Text>
        <Text style={{ opacity: 0.7, fontSize: 16 }}>RM 10.00</Text>
      </View>
      <VreserveButton />
      
      <BottomTabsVendor />
    </View>
  );
}
