import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";

export default function VendorConfirmOrder() {
  return (
    <View style={{ backgroundColor: "#fff", paddingTop: 40, flex: 1 }}>
      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 14, marginHorizontal: 30 }}>
          Please enter the verification code provided by the customer.
        </Text>
        <TextInput
          placeholder="Verification code"
          keyboardType="numeric"
          style={{
            backgroundColor: "#E8E8E8",
            margin: 20,
            height: 40,
            width: 300,
            padding: 10
          }}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: 20
          }}
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
      </View>
      <BottomTabsVendor />
    </View>
  );
}
