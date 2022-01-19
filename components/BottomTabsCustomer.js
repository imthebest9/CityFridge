import React from "react";
import { StackActions } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BottomTabsCustomer({navigation}) {
  const Icon = (props) => (
    <TouchableOpacity onPress={()=>navigation.dispatch(StackActions.replace(props.screen))}>
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
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 10,
        justifyContent: "space-around",
        width: Dimensions.get("screen").width
      }}
    >
      <Icon icon="home" text="Home" screen="Home Page"/>
      <Icon icon="shopping-cart" text="Cart" screen="Taddcart"/>
      <Icon icon="user-alt" text="Profile" screen="Profile"/>
    </View>
  );
}