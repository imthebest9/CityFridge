import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const items = [
  {
    image: require("../assets/apple.jpg"),
    text: "Apple",
    price: "RM 10.00",
  },
  {
    image: require("../assets/bread.jpg"),
    text: "Bread",
    price: "RM 2.00",
  },
  {
    image: require("../assets/potato.jpg"),
    text: "Potato",
    price: "RM 3.00",
  },
  {
    image: require("../assets/potato.jpg"),
    text: "Potato",
    price: "RM 3.00",
  },
  {
    image: require("../assets/potato.jpg"),
    text: "Potato",
    price: "RM 3.00",
  },
  {
    image: require("../assets/potato.jpg"),
    text: "Potato",
    price: "RM 3.00",
  },
  {
    image: require("../assets/potato.jpg"),
    text: "Potato",
    price: "RM 3.00",
  },
];

export default function StoreItems() {
  return (
    <View style={{ marginTop: 10, marginLeft: 20 }}>
      <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {items.map((item, index) => (
            <View key={index} style={{ marginRight: 25 }}>
              <TouchableOpacity>
                <Image
                  source={item.image}
                  style={{ width: 100, height: 100, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    fontFamily: "MerriweatherSans_300Light",
                  }}
                >
                  {item.text}
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    fontFamily: "MerriweatherSans_700Bold",
                  }}
                >
                  {item.price}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
