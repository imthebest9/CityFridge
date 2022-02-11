import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

import { database } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

export default function Tshowtac({ navigation }) {
  const [reserve, setReservation] = useState(null);

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(database, "reservations"));
    const saveFirebaseItems = [];
    querySnapshot.forEach((doc) => {
      saveFirebaseItems.push(doc.data());
    });
    setReservation(saveFirebaseItems);
  }, []);

  const reply = () => {
    if (reserve) return (reserve[reserve.length - 1].ConfirmationCode);
    else return ("No yet");
  };

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
            {reply()}
          </Text>
        </View>
        <View style={{ flex: 1, marginTop: 20, width: 100 }}>
          <Button
            title="Done"
            onPress={() => navigation.navigate("Home Page")}
          />
        </View>
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
