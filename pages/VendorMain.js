import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import HeaderTabsVendor from "../components/vendor/HeaderTabsVendor";
import Reservations from "../components/vendor/Reservations";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";
import ManageFood from "../components/vendor/ManageFood";

export default function VendorMain({ navigation }) {
  const [activeTab, setActiveTab] = useState("Reservation");
  return (
    <View style={styles.header}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {/* <Text
            style={{
              fontSize: 24,
              fontFamily: "Merriweather_900Black",
            }}
          >
            Your Store
          </Text> */}
        <View style={{ backgroundColor: "white", padding: 15, marginTop: -30 }}>
          <HeaderTabsVendor activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>
      </View>
      {activeTab === "Reservation" ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 7 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Reservations />
            </ScrollView>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#4EB574",
                paddingVertical: 13,
                paddingHorizontal: 70,
                borderRadius: 30,
              }}
              onPress={() => navigation.navigate("Confirm Order")}
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
      ) : (
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Merriweather_700Bold",
              margin: 20,
            }}
          >
            Current stock
          </Text>
          <View style={{ flex: 6 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ManageFood />
            </ScrollView>
          </View>
          <View
            style={{
              flex: 4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#4EB574",
                paddingVertical: 13,
                paddingHorizontal: 55,
                borderRadius: 30,
                margin: 10,
              }}
              onPress={() => navigation.navigate("Update Food Quantity")}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Merriweather_400Regular",
                  color: "white",
                }}
              >
                Update Food Quantity
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#4EB574",
                paddingVertical: 13,
                paddingHorizontal: 70,
                borderRadius: 30,
                margin: 10,
              }}
              onPress={() => navigation.navigate("Add New Food Type")}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Merriweather_400Regular",
                  color: "white",
                }}
              >
                Add new food type
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <BottomTabsVendor />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingTop: 40,
    flex: 1,
  },
});
