import React from "react";
import { View, Text } from "react-native";
import NumericInput from "react-native-numeric-input";

const items = [
  {
    food: "Sardin",
    quantity: "9",
  },
  {
    food: "Bread",
    quantity: "11",
  },
  {
    food: "Cake",
    quantity: "19",
  },
  {
    food: "Coke",
    quantity: "20",
  },
  {
    food: "Sardin",
    quantity: "9",
  },
  {
    food: "Bread",
    quantity: "11",
  },
  {
    food: "Cake",
    quantity: "19",
  },
  {
    food: "Coke",
    quantity: "20",
  },
  {
    food: "Sardin",
    quantity: "9",
  },
  {
    food: "Bread",
    quantity: "11",
  },
  {
    food: "Cake",
    quantity: "19",
  },
  {
    food: "Coke",
    quantity: "20",
  },
];

export default function FoodQuantityUpdate() {
  return (
    <View>
      {items.map((item, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                flex: 1,
                marginLeft: 20,
                fontFamily: "MerriweatherSans_400Regular",
                fontSize: 16,
              }}
            >
              {item.food}
            </Text>
            {/* <Text
              style={{
                marginRight: 30,
                fontFamily: "MerriweatherSans_400Regular",
              }}
                 fontSize: 16,
           >
              {item.quantity}
            </Text> */}
            <NumericInput value={parseInt(item.quantity)} containerStyle={{marginRight: 30, width: 150, height: 60}} />
          </View>
          <View
            style={{
              bordorBottomColor: "black",
              borderBottomWidth: 1,
              marginTop: 15,
              marginHorizontal: 20,
            }}
          />
        </View>
      ))}
    </View>
  );
}
