import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import NumericInput from "react-native-numeric-input";
import {
  collection,
  writeBatch,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { database } from "../../firebase";
import { useIsFocused } from "@react-navigation/native";

export default function FoodQuantityUpdate() {
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

  useEffect(async() => {
    const querySnapshot = await getDocs(collection(database, "foods"));
    const saveFirebaseItems = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      saveFirebaseItems.push(doc.data());
    });
    setItems(saveFirebaseItems);
  }, [useIsFocused()])

  const onUpdate = async () => {
    for (let x in items) {
      // console.log(items[x].name);
      console.log(x);
      await setDoc(
        doc(database, "foods", items[x].name),
        {
          quantity: items[x].quantity,
        },
        { merge: true }
      );
    }
    // await batch.commit();
  };

  const updateFieldChanged = (index) => (e) => {
    console.log("index: " + index);
    let newArr = [...items];
    newArr[index].quantity = e;

    setItems(newArr);
    // console.log(items)
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 90, marginBottom: 30 }}>
        <Button onPress={onQuery} title="Refresh" color="#4EB574" />
      </View>
      <View style={{ flex: 3 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {items.map((item, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                {/* <NumericInput
                  initValue={item.quantity}
                  containerStyle={{ marginRight: 30, width: 150, height: 60 }}
                /> */}
                <TextInput
                  value={items.quantity}
                  onChangeText={updateFieldChanged(index, item)}
                  style={{
                    backgroundColor: "#E8E8E8",
                    margin: 10,
                    marginLeft: 25,
                    height: 40,
                    width: 130,
                    padding: 10,
                    fontSize: 16,
                    fontFamily: "MerriweatherSans_400Regular",
                  }}
                  keyboardType="numeric"
                />
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
        </ScrollView>
      </View>
      <View style={{ flex: 1, marginTop: 50, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#4EB574",
            paddingVertical: 13,
            paddingHorizontal: 110,
            borderRadius: 30,
            margin: 10,
          }}
          onPress={onUpdate}
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
    </View>
  );
}
