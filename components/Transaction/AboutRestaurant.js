import React,{useState, useEffect} from "react";
import { View, Text, Image } from "react-native";
import { database } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

const yelpRestaurantInfo = {
  name: "Kingsbay Restaurant",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg",
  rating: 4.5,
  kilogram: 30,
};

const { name, image, rating, kilogram } = yelpRestaurantInfo;
// const formattedCategories = categories.map((cat)=> cat.title).join(" • ");
const description = `Rating: ${rating}⭐ Total Saved: ${kilogram} kg`;

export default function AboutRestaurant() {

  const [storeData, setStoreData] = useState([]);

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(database, "Stores"));
    const saveFirebaseItems = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      saveFirebaseItems.push(doc.data());
    });
    setStoreData(saveFirebaseItems);
  }, []); 
  // [useIsFocused()]
  console.log(storeData[0].name);

  return (
    <View>
      <RestaurantName name= {storeData[1].name} />
      <RestaurantImage image = {storeData[1].image_url}  />
      <RestaurantDescription description= {storeData[1].description}  />
    </View>
  );
}

const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }} style={{ width: "100%", height: 180 }} />
);

const RestaurantName = (props) => (
  <Text
    style={{
      fontSize: 21,
      // marginTop:8,
      textAlign: "center",
      // marginHorizontal:15,
    }}
  >
    {props.name}
  </Text>
);

const RestaurantDescription = (props) => (
  <View>
    <Text
      style={{
        marginTop: 3,
        marginHorizontal: 15,
        fontSize: 15,
      }}
    >
      {props.description}
    </Text>
  </View>
);

/*
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
});*/
