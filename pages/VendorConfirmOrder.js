import { collection, doc, getDocs, updateDoc } from "@firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";
import { database } from "../firebase";

export default function VendorConfirmOrder() {
  const [code, setCode] = useState();
  const [res, setRes] = useState([]);

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(database, "reservations"));
    const saveFirebaseItems = [];
    querySnapshot.forEach((doc) => {
      saveFirebaseItems.push(doc.data());
    });
    setRes(saveFirebaseItems);
  }, [useIsFocused()]);

  console.log(code);

  const onConfirm = async () => {
    for (let r in res) {
      if (res[r].ConfirmationCode === code) {
        try {
          await updateDoc(doc(database, "reservations", "Reservation1"), {
            isComplete: "True"
          });
          console.log("yes");
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", paddingTop: 40, flex: 1 }}>
      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 14, marginHorizontal: 30 }}>
          Please enter the verification code provided by the customer.
        </Text>
        <TextInput
          placeholder="Verification code"
          // keyboardType="numeric"
          onChangeText={(input) => setCode(input)}
          style={{
            backgroundColor: "#E8E8E8",
            margin: 20,
            height: 40,
            width: 300,
            padding: 10,
          }}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#4EB574",
              paddingVertical: 13,
              paddingHorizontal: 70,
              borderRadius: 30,
            }}
            onPress={onConfirm}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Merriweather_400Regular",
                color: "white",
              }}
            >
              Confirm Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomTabsVendor />
    </View>
  );
}
