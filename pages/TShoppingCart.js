import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BottomTabsCustomer from "../components/BottomTabsCustomer";


export default function TShoppingCart({ navigation }) {
  return (
    <View>
      <View style={styles.container}>
        <Text>Shopping Cart</Text>
        
      </View>
      <BottomTabsCustomer style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
