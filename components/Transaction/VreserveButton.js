import React, { useContext, useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { Tcontext } from "../../pages/Tcontext";
import { database } from "../../firebase";
import { doc, setDoc, updateDoc,  increment, Timestamp } from "firebase/firestore";

var count = 1;
// Generate 6 random digit
const get6digit = () => {
  var code = (Math.floor(Math.random() * 1000000) + 1000000)
    .toString()
    .substring(1);
  return code;
};

export default function VreserveButton({navigation}) {
  const [cart, setCart] = useContext(Tcontext);

  // submit to firebase
  const onSave = async () => {
    var reserve = "Reservation" + count;
    count++;
    var foodsObj = {};
    var foodsPrice = 0;
    var naming = "";
  
    for (let x in cart) {
      foodsObj[cart[x].name] = 1;
      foodsPrice += cart[x].price;
    } //  end for

    await setDoc(doc(database, "reservations", reserve), {
      foods: foodsObj,
      price: foodsPrice,
      isComplete: "False",
      ConfirmationCode: get6digit(),
      date: Timestamp.now(),
      customerID: "001",
      customerName:"Tiger"
    });
    // Update the quantity in foods
    //   Initial >> Kuih:1, Apple:5, Sushi:3
    for (let x in cart) {
      if ([cart[x].name] == "Kuih") naming = "Food1";
      else if ([cart[x].name] == "Apple") naming = "Food2";
      else if ([cart[x].name] == "Sushi") naming = "Food3";
      
      const foodDocRef = doc(database, "foods", naming);
      await updateDoc(foodDocRef, {
        quantity: increment(-1),
      });
      
    } //  end for
    navigation.navigate("Last Page");
    
  };
  // end of submit

  return (
    <View style={styles.a}>
      <View style={styles.b}>
      
        <TouchableOpacity style={styles.c} onPress={onSave} >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              alignContent: "space-between",
            }}
          >
            {" "}
            Place Order ＞{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  a: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    zIndex: 999,
  },
  b: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  c: {
    marginTop: 20,
    backgroundColor: "#0B4619",
    alignItems: "center",
    padding: 13,
    borderRadius: 10,
    width: 300,
    position: "relative",
  },
});
