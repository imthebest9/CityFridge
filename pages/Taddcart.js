import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import AboutFood from "../components/Transaction/AboutFood";
import AboutRestaurant from "../components/Transaction/AboutRestaurant";
import BottomTabsCustomer from "../components/BottomTabsCustomer";


const Separator = () => <View style={styles.separator} />;


const Taddcart = ({ navigation }) => {
  
  return (
    <View style={{ flex: 1 }}>
      <AboutRestaurant />

      <Separator />
      
      <AboutFood />

      <BottomTabsCustomer style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
};
export default Taddcart;

const styles = StyleSheet.create({
  separator: {
    marginVertical: 6,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});