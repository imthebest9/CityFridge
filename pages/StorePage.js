import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import BottomTabsCustomer from "../components/BottomTabsCustomer";
import StoreItems from "../components/StoreItems";

export default function StorePage() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#116530", alignItems: "center", flex: 2 }}>
        <Image
          source={require("../assets/kingsbay_hypermarket.png")}
          style={{ width: 600, height: 110, resizeMode: "contain" }}
        />
      </View>
      <View style={{ flex: 6 }}>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 24,
            fontFamily: "Merriweather_700Bold",
          }}
        >
          Nearly-expired
        </Text>
        <StoreItems />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#4EB574",
            paddingVertical: 13,
            paddingHorizontal: 55,
            borderRadius: 100,
            margin: 5,
          }}
          //   onPress={() => navigation.navigate("")}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Merriweather_400Regular",
              color: "white",
            }}
          >
            Reserve - 0.00
          </Text>
        </TouchableOpacity>
      </View>
      <BottomTabsCustomer />
    </View>
  );
}
