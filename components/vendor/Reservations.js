import React from "react";
import { View, Text } from "react-native";

const items = [
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
];

export default function Reservations() {
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
                {item.userid}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "MerriweatherSans_300Light",
                }}
              >
                {item.food}
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
                {item.time}
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
