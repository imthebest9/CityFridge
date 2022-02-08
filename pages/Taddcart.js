import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AboutFood from "../components/Transaction/AboutFood";
import AboutRestaurant from "../components/Transaction/AboutRestaurant";
import BottomTabsCustomer from "../components/BottomTabsCustomer";
import { database } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Separator = () => <View style={styles.separator} />;


const Taddcart = ({ navigation }, props) => {
  // const [foodItem, setFoodItem] = useState();
  // const [quantity, setQuantity] = useState(null);
  // const [price, setPrice] = useState(null);

  // const onSave = async () => {
  //   await setDoc(doc(database, "reservations", foodItem), {
  //     name: foodItem,
  //     quantity: parseFloat(quantity),
  //     price: parseFloat(price),
  //   });
  //   console.log("saved");
  // };
  return (
    <View style={{ flex: 1 }}>
      <AboutRestaurant />

      <Separator />
      {/* <View style={{ backgroundColor: "#fff", paddingTop: 40, flex: 1 }}>
        <ScrollView>
          <TextInput
            placeholder="Food Name"
            style={styles.input}
            onChangeText={(input) => setFoodItem(input)}
          />
          <TextInput
            placeholder="Food Quantity"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(input) => setQuantity(input)}
          />
          <TextInput
            placeholder="Food Price"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(input) => setPrice(input)}
          />
        </ScrollView>
        <View style={{ flex: 1, marginTop: 30, alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#4EB574",
              paddingVertical: 13,
              paddingHorizontal: 110,
              borderRadius: 30,
              margin: 10,
            }}
            onPress={onSave}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Merriweather_400Regular",
                color: "white",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}

      <AboutFood />

      {/*  <AddCart /> */}

      <BottomTabsCustomer style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
};
export default Taddcart;

const styles = StyleSheet.create({
  /*container: {
    flex: 1,
    backgroundColor: "blue",
    paddingTop: 601,
  },*/

  separator: {
    marginVertical: 6,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
