import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase";
import { useIsFocused } from "@react-navigation/native";

const items = [
  {
    food: "Sardin",
    quantity: "9",
  },
  {
    food: "Bread",
    quantity: "11",
  },
  {
    food: "Cake",
    quantity: "19",
  },
  {
    food: "Coke",
    quantity: "20",
  },
  {
    food: "Sardin",
    quantity: "9",
  },
  {
    food: "Bread",
    quantity: "11",
  },
  {
    food: "Cake",
    quantity: "19",
  },
  {
    food: "Coke",
    quantity: "20",
  },
  {
    food: "Sardin",
    quantity: "9",
  },
  {
    food: "Bread",
    quantity: "11",
  },
  {
    food: "Cake",
    quantity: "19",
  },
  {
    food: "Coke",
    quantity: "20",
  },
];

export default function ManageFood() {
  const [items, setItems] = useState([]);

  const onQuery = async () => {
    const querySnapshot = await getDocs(collection(database, "foods"));
    const saveFirebaseItems = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      saveFirebaseItems.push(doc.data());
    });
    setItems(saveFirebaseItems);
  };

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(database, "foods"));
    const saveFirebaseItems = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      saveFirebaseItems.push(doc.data());
    });
    setItems(saveFirebaseItems);
  }, [useIsFocused()]);

  return (
    <View>
      {/* <View style={{ marginHorizontal: 90, marginBottom: 10 }}>
        <Button onPress={onQuery} title="Refresh" color="#4EB574" />
      </View> */}
      {items.map((item, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                flex: 1,
                marginLeft: 20,
                fontFamily: "MerriweatherSans_400Regular",
                fontSize: 16,
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                marginRight: 30,
                fontFamily: "MerriweatherSans_400Regular",
                fontSize: 16,
              }}
            >
              {item.quantity}
            </Text>
          </View>
          <View
            style={{
              bordorBottomColor: "black",
              borderBottomWidth: 1,
              marginTop: 15,
              marginHorizontal: 20,
            }}
          />
        </View>
      ))}
    </View>
  );
}
