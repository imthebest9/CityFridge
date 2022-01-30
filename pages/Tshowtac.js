import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import GenerateTac from "../components/Transaction/GenerateTac";

export default function Tshowtac() {
  return (
    <View style={styles.item}>
      <View style={styles.square}>
        <Text style={{ fontSize: 45 }}>🕓</Text>
        <Text style={styles.text}>Reedem within 24 hours</Text>
        <Text style={styles.msg}>
          {"Show this code to cashier to reedem food"}
        </Text>
        <View style={styles.smallSquare}>
          <Text style={styles.text}>
            <GenerateTac />
          </Text>
        </View>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: "#4EBB76",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    marginTop: 11,
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 12,
  },

  msg: {
    fontWeight: "bold",
    fontSize: 21,
    color: "grey",
    maxWidth: "80%",
    textAlign: "center",
    marginBottom: 30,
  },

  square: {
    backgroundColor: "white",
    width: 343,
    height: 390,
    alignItems: "center",
  },
  smallSquare: {
    backgroundColor: "#E8E8CC",
    width: 180,
    height: 45,
    alignItems: "center",
  },
});
