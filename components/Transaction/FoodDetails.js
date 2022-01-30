import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import AboutFood from "./AboutFood";

const renderCart = (props) => {
  {
    cart.map((food, index) => (
      <View key={index}>
        <View style={styles.foodItemStyle}>
          <FoodImage food={food} />
          <FoodInfo food={food} />
        </View>
      </View>
    ));
  }
};

const FoodDetails = ({ navigation }, props) => {
  
  return (
    <View>
      
      <Text>{props.title}</Text>
     
    </View>
  );
};

export default FoodDetails;

