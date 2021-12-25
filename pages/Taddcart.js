import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AboutRestaurant from "../components/Transaction/AboutRestaurant";

const Separator = () => <View style={styles.separator} />;

export default function Taddcart() {
  return (
    <View>
      <AboutRestaurant />

      <Separator />

      
    </View>
  );
}

const styles = StyleSheet.create({
  /*container: {
    flex: 1,
    backgroundColor: "blue",
    paddingTop: 601,
  },*/

  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
