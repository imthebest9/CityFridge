import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  Platform,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";
import { database } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export default function VendorNewFoodType() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [price, setPrice] = useState(null);
  const [weight, setWeight] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const onSave = async ()=> {
    await setDoc(doc(database, "foods", name), {
      name: name,
      quantity: quantity,
      price: price,
      weight: weight,
      date: date,
    });
    console.log("saved")
  };

  return (
    <View style={{ backgroundColor: "#fff", paddingTop: 40, flex: 1 }}>
      <ScrollView>
        <TextInput
          placeholder="Food Name"
          style={styles.input}
          onChangeText={(input) => setName(input)}
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
        <TextInput
          placeholder="Food Weight (in kg)"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(input) => setWeight(input)}
        />
        <View>
          <View style={{ marginTop: 10, marginLeft: 25, marginRight: 140 }}>
            <Button
              onPress={showDatepicker}
              title="Pick expiry date"
              color="#4EB574"
            />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
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
      </ScrollView>
      <BottomTabsVendor />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#E8E8E8",
    margin: 10,
    marginLeft: 25,
    height: 40,
    width: 300,
    padding: 10,
    fontSize: 16,
    fontFamily: "MerriweatherSans_400Regular",
  },
});
