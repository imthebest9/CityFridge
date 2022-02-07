import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
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
  const [storeData, setStoreData] = useState(null);

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(database, "Stores"));
    const saveFirebaseItems = [];
    querySnapshot.forEach((doc) => {
      saveFirebaseItems.push(doc.data());
    });
    setStoreData(saveFirebaseItems);
  }, []);
  // [useIsFocused()]
  // console.log(storeData[0].name);

  return (
    <View>
      {/* <RestaurantName name={name} />
      <RestaurantImage image={image} />
      <RestaurantDescription description={description} /> */}

      {/* <RestaurantName name={storeData === [] ? "UNKNOWN" : storeData[1].name} /> */}
      <RestaurantName name={storeData ? storeData[1].name : "Loading" } />
      <RestaurantImage image={storeData ? storeData[1].image_url : "Null Image" } />
      <RestaurantDescription
        description={storeData ? storeData[1].review + `⭐` + "\t\t" + storeData[1].description: "" }
      />
      {/* <ScrollView vertical>
      {storeData.map((Store, index) => (
        <View key={index}>
          <View>
            <RestaurantName name={Store.name} />
            <RestaurantImage image={Store.image_url} />
            <RestaurantDescription
              description={
                Store.review + `⭐` + "\t\t" + Store.description
              }
            />
          </View>
        </View>
      ))}
      </ScrollView> */}
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
