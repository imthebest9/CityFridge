import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase";
import { useIsFocused } from "@react-navigation/native";

const items = [
  {
    userid: "userno1",
    food: "sardin x2, bread x3",
    time: "4/1/2022 7:15:30 AM",
  },
  {
    userid: "userno2",
    food: "coke x3, bread x3",
    time: "8m ago",
  },
  {
    userid: "userno3",
    food: "sardin x4, bread x3",
    time: "11m ago",
  },
  {
    userid: "userno1",
    food: "sardin x2, bread x3",
    time: "8m ago",
  },
  {
    userid: "userno2",
    food: "coke x3, bread x3",
    time: "8m ago",
  },
  {
    userid: "userno3",
    food: "sardin x4, bread x3",
    time: "11m ago",
  },
  {
    userid: "userno1",
    food: "sardin x2, bread x3",
    time: "8m ago",
  },
  {
    userid: "userno2",
    food: "coke x3, bread x3",
    time: "8m ago",
  },
  {
    userid: "userno3",
    food: "sardin x4, bread x3",
    time: "11m ago",
  },
  {
    userid: "userno1",
    food: "sardin x2, bread x3",
    time: "8m ago",
  },
  {
    userid: "userno2",
    food: "coke x3, bread x3",
    time: "8m ago",
  },
  {
    userid: "userno3",
    food: "sardin x4, bread x3",
    time: "11m ago",
  },
  {
    userid: "userno3",
    food: "sardin x4, bread x3",
    time: "11m ago",
  },
];

export default function Reservations() {
  const [items, setItems] = useState([]);

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(database, "reservations"));
    const saveFirebaseItems = [];
    querySnapshot.forEach((doc) => {
      saveFirebaseItems.push(doc.data());
    });
    setItems(saveFirebaseItems);
  }, [useIsFocused()]);

  const getFoods = (foods) => {
    let str = ""

    for(key in foods ){
      str += key + " x" + foods[key] + "\n";
    }

    return str.trimEnd();
  }

  return (
    <View style={{ marginTop: 20 }}>
      {items.map((item, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginLeft: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "MerriweatherSans_700Bold",
                  marginBottom: 10,
                }}
              >
                {item.customerName}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "MerriweatherSans_300Light",
                }}
              >
                {getFoods(item.foods)}
              </Text>
            </View>
            <View style={{ marginRight: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "MerriweatherSans_300Light",
                  color: "#4EB574",
                }}
              >
                {new Date(item.date.toDate()).toUTCString()}
              </Text>
            </View>
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
