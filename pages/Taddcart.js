import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AboutFood from "../components/Transaction/AboutFood";
import AboutRestaurant from "../components/Transaction/AboutRestaurant";
import AddCart from "../components/Transaction/AddCart";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";

const Separator = () => <View style={styles.separator} />;

export default function Taddcart() {
  return (
    <View style={{flex:1}}>
      <AboutRestaurant />

      <Separator />

      <AboutFood />

      <AddCart/>
      <BottomTabsVendor/>
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
    
    marginVertical: 6,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
