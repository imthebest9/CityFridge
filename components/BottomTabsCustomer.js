import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BottomTabsCustomer() {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 50,
        justifyContent: "space-between",
      }}
    >
      <Icon icon="home" text="Home" />

      <View>
        <View
          style={{
            position: "absolute", height: 30, width: 30,
            borderRadius: 15, backgroundColor: '#116530',
            left: 15, bottom: 30,
            alignItems: "center", justifyContent: "center", zIndex: 2000,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>0</Text>
        </View>

        <Icon icon="shopping-cart" text="Cart" />
      </View>
      <Icon icon="user-alt" text="Profile" />
    </View>
  );
}

const Icon = (props) => (
  <TouchableOpacity>
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);
