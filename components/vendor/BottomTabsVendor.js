import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { StackActions } from '@react-navigation/native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BottomTabsVendor({navigation}) {
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
      <Icon icon="home" text="Home" screen="Your Store"/>
      <Icon icon="user-alt" text="Profile" screen="Profile"/>
    </View>
  );
}
