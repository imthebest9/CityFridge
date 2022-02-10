import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getDownloadURL, ref } from "firebase/storage";
import { database } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function Foods() {
  const [foodData, setFoodData] = useState([]);
  const [filteredData, setfilterData] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(database, "foods"));
    const saveFirebaseItems = [];
    querySnapshot.forEach(async (doc) => {
      saveFirebaseItems.push(doc.data());
    });
    setStoreData(saveFirebaseItems);
  }, [useIsFocused()]);

  ////////////////////////////////////////
  useEffect(() => {
    fetchPosts();
    return () => {};
  }, []);

  const fetchPosts = () => {
    setfilterData(foodData);
    setFoodData(foodData);
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = foodData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setsearch(text);
    } else {
      setfilterData(foodData);
      setsearch(text);
    }
  };

  ///////////////////////////////////////////

  return (
    <View>
      <View>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Search Food"
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text)}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          marginRight: 10,
          flex: 1,
        }}
      >
        <ScrollView vertical>
          {filteredData.map((Store, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                paddingBottom: 10,
                paddingTop: 10,

                flex: 1,
                borderBottomWidth: 1,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Taddcart")}>
                <StoreImage image={Store.image_url} />
              </TouchableOpacity>

              <StoreInfo name={Store.name} description={Store.description} />
              {/* <Text>{Store.name}</Text> */}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const FoodImage = (props) => (
  <View
    style={{
      alignItems: "center",
      marginLeft: 15,
      borderRadius: 20,
    }}
  >
    <Image
      source={{
        uri: props.image,
      }}
      style={{ width: 120, height: 120, borderRadius: 20 }}
    />
  </View>
);

const FoodInfo = (props) => (
  <View
    style={{
      // marginTop: 10,
      marginLeft: 10,
      // marginRight: 140,
      // paddingRight: 145,
      // justifyContent: "center",
      height: 100,
      flex: 1,
    }}
  >
    <Text
      style={{
        fontFamily: "MerriweatherSans_700Bold",
      }}
    >
      {props.name}
    </Text>
    <View
      style={{
        marginTop: 5,
        marginBottom: 5,
        // flex: 1
      }}
    >
      <ScrollView vertical>
       
        <View
          style={{
            flex: 1,
            textAlign: "justify",
          }}
        >
          <Text
            style={{
              fontFamily: "MerriweatherSans_300Light",
            }}
          >
            {props.description}
          </Text>
        </View>
      </ScrollView>
     
    </View>
  </View>
);

//Search Bar stylesheet
const styles = StyleSheet.create({
  constainer: {
    backgroundColor: "blue",
  },
  itemStyle: {
    padding: 15,
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "white",
  },
});
