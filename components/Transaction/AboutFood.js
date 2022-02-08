import React, { useState,useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { database } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { Tcontext } from "../../pages/Tcontext";


export default function AboutFood({ navigation }, props) {
  // foodData contains all food from firebase
  const [foodData, setfoodData] = useState([]);
 
  const [cart, setCart] = useContext(Tcontext);

  const addToCart = async (food)=>{ 
  const obj = { id: food.name, name: food.name, price: food.price, image: food.image_url};
  await setCart(currentCart => [...currentCart,obj]);
    
  }

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(database, "foods"));
    const saveFirebaseItems = [];
    querySnapshot.forEach((doc) => {

      saveFirebaseItems.push(doc.data());
    });
    setfoodData(saveFirebaseItems);
  }, [useIsFocused()]);

  const disabled =(food)=>{ 
    if (food.quantity <= 0)
      return true;
    else
      return false;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {foodData.map((food, index) => (
          <View key={index}>
            
              <View style={styles.foodItemStyle}>
                <FoodImage image={food.image_url} />
                <FoodInfo title={food.name} expirydate={food.date} weight={food.weight}  stock={food.quantity} price={food.price} />
                
                <TouchableOpacity onPress={disabled(food) ? null : ()=>addToCart(food)}>
                {/* <TouchableOpacity onPress={ () => addToCart(food)}> */}
                <Icon icon="cart-plus" /> 
                {/* <FoodDetails mycart = {cart}/> */}
                </TouchableOpacity>
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
    <Text>Exp Date: {new Date(props.expirydate.toDate()).toDateString()}</Text> 
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
);