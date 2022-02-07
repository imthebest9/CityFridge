import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Divider from "react-native-divider";
import FoodDetails from "./FoodDetails";
import { database } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";


export default function AboutFood({ navigation }, props) {
  // foodData contains all food from firebase
  const [foodData, setfoodData] = useState([]);
 
  const [cart, setCart] = useState();
  


  useEffect(async () => {
    const querySnapshot = await getDocs(collection(database, "foods"));
    const saveFirebaseItems = [];
    querySnapshot.forEach((doc) => {

      saveFirebaseItems.push(doc.data());
    });
    setfoodData(saveFirebaseItems);
  }, [useIsFocused()]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {foodData.map((food, index) => (
          <View key={index}>
       
              <View style={styles.foodItemStyle}>
                <FoodImage image={food.image_url} />
                <FoodInfo title={food.name} expirydate={food.date} weight={food.weight}  stock={food.quantity} price={food.price} />
                
                <Icon icon="shopping-cart" 
                //  onPress={()=> addToCart(food)}
                /> 
                {/* <FoodDetails mycart = {cart}/> */}
                
              </View>
         
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  foodItemStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 5,
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: "bold",
  },
  priceTitle :{
    fontSize: 15,
    fontWeight: "bold",
    color: "red"
  }
});

const FoodInfo = (props) => (
  <View style={{ width: 235, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.title}</Text>
    <Text>Exp Date:{new Date(props.expirydate.toDate()).toDateString()}</Text> 
    <Text>{props.weight} KG</Text>
    <Text>Stock: {props.stock}</Text>
    <Text style={styles.priceTitle}>RM {props.price}</Text>
  </View>
);

const FoodImage = (props) => (
  <View>
    <Image
      source={{ uri: props.image }}
      style={{ width: 100, height: 100, borderRadius: 8 }}
    />
  </View>
);

const Icon = (props) => (
  <TouchableOpacity>
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          flex:1,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:"space-evenly",
          color: "#FFB84E"
  
        }}
      />
      
    </View>
  </TouchableOpacity>
);