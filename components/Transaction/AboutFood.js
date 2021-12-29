import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import NumericInput from "react-native-numeric-input";

// refer MenuItem in youtube
const food = [
  {
    title: "Apple",
    weight: "Weight: 1.2 kg",
    expirydate: "Expire Date: 04-01-2022",
    stock: "Stock: 3",
    price: "RM 10.00",
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/apples-at-farmers-market-royalty-free-image-1627321463.jpg?crop=1.00xw:0.631xh;0.00160xw,0.206xh&resize=980:*",
  },
];

const styles = StyleSheet.create({
  foodItemStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 20,
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
});

export default function AboutFood() {
  return (
    <View style={styles.foodItemStyle}>
        <BouncyCheckbox
        iconStyle={{borderColor: 'lightgray', borderRadius:6}}
        fillColor="#4EB574"
        />
      <FoodInfo food={food[0]} />
      <FoodImage food={food[0]}/>
     
    </View>
  );
}

const FoodInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text>{props.food.weight}</Text>
    <Text>{props.food.expirydate}</Text>
    <Text>{props.food.stock}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage =(props) =>(
    <View>
        <Image
            source={{uri:props.food.image}}
            style={{width:100,height:100, borderRadius:8}}
        />
    </View>
)