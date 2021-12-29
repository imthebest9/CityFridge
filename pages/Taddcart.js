import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AboutFood from "../components/Transaction/AboutFood";
import AboutRestaurant from "../components/Transaction/AboutRestaurant";
import AddCart from "../components/Transaction/AddCart";

const Separator = () => <View style={styles.separator} />;

export default function Taddcart() {
  return (
    <View>
      <AboutRestaurant />

      <Separator />

      <AboutFood />
      
      <AddCart/>
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
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
