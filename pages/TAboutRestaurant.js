import React from "react";
import { View, Text, Image } from "react-native";
// import { database } from "../firebase";
// import { addDoc, collection, doc, setDoc } from "firebase/firestore";
const yelpRestaurantInfo = {
  name: "Kingsbay Restaurant",
  image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg",
  rating: 4.5,
  kilogram: 30,
};

const {name, image, rating, kilogram}= yelpRestaurantInfo;
// const formattedCategories = categories.map((cat)=> cat.title).join(" • ");
const description = `Rating: ${rating}⭐ Total Saved: ${kilogram} kg`; 

export default function TAboutRestaurant() {
  return (
    <View>
      <RestaurantName name={name}/>
      <RestaurantImage image={image} />
      
      <RestaurantDescription description={description} />
    </View>
  );
}

const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }} style={{ width: "100%", height: 180 }} />
);

const RestaurantName = (props) => (<Text style={{
    fontSize:21,
    marginTop:15,
    textAlign: "center",
    // marginHorizontal:15,
}}>{props.name}</Text>);

const RestaurantDescription = (props) =>(
<Text style={{
    marginTop:3,
    marginHorizontal: 15,
    fontSize:15,
}}>{props.description}</Text>);


/*
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
});*/
