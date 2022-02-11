import { collection, doc, getDoc, getDocs, updateDoc } from "@firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";
import { database } from "../firebase";

export default function VendorConfirmOrder() {
  const [code, setCode] = useState();
  const [res, setRes] = useState([]);

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(database, "reservations"));
    const saveFirebaseItems = [];
    querySnapshot.forEach((doc) => {
      saveFirebaseItems.push(doc);
    });
    setRes(saveFirebaseItems);
  }, [useIsFocused()]);

  const onConfirm = async () => {
    let alertFlag = false;
    for (let r in res) {
      if (res[r].data().ConfirmationCode == code) {
        let str = "";
        let contribution = (await getDoc(doc(database, "history", res[r].data().vendorID))).data().contribution
        for ( key in res[r].data().foods) {
          str += key + " x" + res[r].data().foods[key] + "\n";
          const food = (await getDoc(doc(database, "foods", key))).data()
          contribution += food.weight * food.quantity
        }
        str = str.trimEnd();

        Alert.alert("Order has been confirmed", `${str}`);
        alertFlag = true;
        try {
          await updateDoc(doc(database, "reservations", res[r].id), {
            isComplete: true,
          });
          await updateDoc(doc(database, "history", res[r].data().vendorID), {
            contribution: contribution
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
    /*if (!alertFlag) {
      Alert.alert("Error", "Invalid code");
    }*/
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