import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import FoodQuantityUpdate from "../components/vendor/FoodQuantityUpdate";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";

export default function VendorUpdateFoodQty() {
  return (
    <View style={{ backgroundColor: "#fff", paddingTop: 40, flex: 1 }}>
      {/* <View style={{ flexDirection: "row" }}>
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
        </View> */}
      {/* <View style={{ marginTop: 30, marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Merriweather_700Bold",
              margin: 20,
            }}
          >
            Update Food Quality
          </Text>
        </View> */}
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
