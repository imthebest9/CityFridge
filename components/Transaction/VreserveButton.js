import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function VreserveButton() {
  return (
    <View style={{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        position:"absolute",
        bottom: 130,
        zIndex: 999,
    }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: "#0B4619",
            alignItems: "center",
            padding: 13,
            borderRadius: 30,
            width: 300,
            position: "relative",
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}> Confirm Reserve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

