import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function HeaderTabsVendor(props) {
  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      <HeaderButton
        text="Reservation"
        btnColor="#4EB574"
        textColor="#F6F6F6"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="Manage Food"
        btnColor="#F6F6F6"
        textColor="#4EB574"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
}

const HeaderButton = (props) => (
  <TouchableOpacity
    style={{
      backgroundColor: props.activeTab === props.text ? "#4EB574" : "#F6F6F6",
      paddingVertical: 13,
      paddingHorizontal: 40,
      borderRadius: 30,
      marginTop: 5,
    }}
    onPress={() => props.setActiveTab(props.text)}
  >
    <Text
      style={{
        color: props.activeTab === props.text ? "white" : "#BDBDBD",
        fontSize: 18,
        fontFamily: "Merriweather_400Regular"
      }}
    >
      {props.text}
    </Text>
  </TouchableOpacity>
);
