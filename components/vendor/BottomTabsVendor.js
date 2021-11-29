import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BottomTabsVendor() {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 80,
        justifyContent: "space-between",
      }}
    >
      <Icon icon="home" text="Home" />
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
