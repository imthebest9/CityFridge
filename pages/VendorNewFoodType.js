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
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";
import { database, storage } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

export default function VendorNewFoodType() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [price, setPrice] = useState(null);
  const [weight, setWeight] = useState(null);
  const [image, setImage] = useState(null)

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

  const onSave = async () => {
    await setDoc(doc(database, "foods", name), {
      name: name,
      quantity: parseFloat(quantity),
      price: parseFloat(price),
      weight: parseFloat(weight),
      date: date,
    });
    console.log("saved");
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
        <View style={{}}>
          <TouchableOpacity
            style={styles.profilePicFrame}
            onPress={async () => {
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
              });

              if (!result.cancelled) {
                const response = await fetch(result.uri);
                const blob = await response.blob();
                const ref2 = ref(storage, `${name}.jpg`);
                uploadBytes(ref2, blob)
                  .then(async () => {
                    setDoc(
                      doc(database, "foods", `${name}`),
                      {
                        image_url: await getDownloadURL(ref2),
                      },
                      { merge: true }
                    );
                    setImage(result.uri);
                  })
                  .catch((error) => alert(error.message));
              }
            }}
          >
            <Text style={{color: "white", marginTop: 10}}>PICK FOOD IMAGE</Text>
            {<Image style={styles.profilePic} source={{ uri: image }} />}
          </TouchableOpacity>
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
  profilePicFrame: {
    alignItems: "center",
    backgroundColor: "#4EB574",
    margin: 10,
    marginHorizontal: 25,
    marginRight: 140,
    height: 40,
  },
  profilePic: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 80,
    height: 120,
    width: 120,
  },
});
