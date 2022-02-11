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
import Navigation from "../../Navigation";
import DropdownMenu from "react-native-dropdown-menu";
let apiKey = "AIzaSyBOEnN1am9vWvDCIcCF2YurPo8OGwHQDKo";

import * as Location from "expo-location";

export default function Stores({ navigation }) {
  const [storeData, setStoreData] = useState([]);
  const [storeCategory, setStoreCategory] = useState("All");
  const [filteredCategory, setfilterCategory] = useState([]);
  const [filteredData, setfilterData] = useState([]);
  const [search, setsearch] = useState("");
  const [category, setCategory] = useState();
  const data = [["All", "Japan", "JavaScript", "PHP"]];
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [centerLat, setCenterLat] = useState();
  const [centerLong, setCenterLong] = useState();
  const [address, setAddress] = useState(null);
  var centerPt = { lat: 2.2021996431185085, lng: 102.25251482831439 }; // Center Pt

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(database, "vendors"));
    const saveFirebaseItems = [];
    querySnapshot.forEach(async (doc) => {
      saveFirebaseItems.push(doc.data());
    });
    setStoreData(saveFirebaseItems);
  }, [useIsFocused()]);

  ////////////////////////////////////////
  useEffect(() => {
    fetchPosts();
    getLocation();
    return () => {};
  }, []);

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      Location.setGoogleApiKey(apiKey);

      console.log(status);

      let { coords } = await Location.getCurrentPositionAsync();

      setLocation(coords);
      setCenterLat(coords.latitude);
      setCenterLong(coords.longitude);
      console.log(coords);

      if (coords) {
        let { longitude, latitude } = coords;

        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        setAddress(regionName[0]);
        console.log(regionName, "nothing");
        console.log("Region Name Here", regionName);
      }

      // console.log();
    })();
  };

  const getDistance = (checkPtLat, checkPtLong, centerPtLat, centerPtLong) => {
    var ky = 40000 / 360; // Some formula
    var kx = Math.cos((Math.PI * centerPtLat) / 180.0) * ky;
    var dx = Math.abs(centerPtLong - checkPtLong) * kx;
    var dy = Math.abs(centerPtLat - checkPtLat) * ky;
    var distance = Math.sqrt(dx * dx + dy * dy);
    distance = distance.toFixed(2);
    return distance;
  }

  const fetchPosts = () => {
    //setCategory(data[0][0]);
    //setCategory({ text: data[0][0] });
    //console.log("Line97",category.text)
    setfilterData(storeData);
    setStoreData(storeData);
  };

  const categoryFilter = (text) => {
    if (text === "Japan") {
      const newData = storeData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();

        const itemData2 = item.description
          ? item.description.toUpperCase()
          : "".toUpperCase();

        const textData = text.toUpperCase();

        return (
          itemData.indexOf(textData) > -1 || itemData2.indexOf(textData) > -1
        );
      });
      setfilterCategory(newData);
    } else if (text === "All") {
      setfilterCategory(storeData);
    }
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = storeData.filter((item) => {
        // const newData = filteredCategory.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();

        const itemData2 = item.description
          ? item.description.toUpperCase()
          : "".toUpperCase();

        const textData = text.toUpperCase();

        return (
          itemData.indexOf(textData) > -1 || itemData2.indexOf(textData) > -1
        );
      });
      setfilterData(newData);
      setsearch(text);
    } else {
      // setfilterData(storeData);
      setfilterData(storeData);
      setsearch(text);
    }
  };

  ///////////////////////////////////////////

  return (
    <View>
      {/* <TouchableOpacity
        onPress={() => {
          categoryFilter("Japan");
          searchFilter("");
        }}
      >
        <View
          style={{
            height: 100,
            backgroundColor: "teal",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text style={styles.btnText}> Filter </Text>
        </View>
      </TouchableOpacity> */}

      <View>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Search Store"
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
              {console.log(Store.latitude, Store.longitude, centerLat, centerLong )}
              <StoreInfo name={Store.name} description={Store.description} distance={getDistance(Store.latitude, Store.longitude, centerLat, centerLong ) }/>
              {/* <Text>{Store.name}</Text> */}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const StoreImage = (props) => (
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

const StoreInfo = (props) => (
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
    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
      <Text
        style={{
          fontFamily: "MerriweatherSans_700Bold",
        }}
      >
        {props.name}
      </Text>
      <Text
        style={{
          fontFamily: "MerriweatherSans_300Light",
        }}
      >
        {props.distance}
        {/* {getDistance(props.latitude, props.longitude, centerLat, centerLong)} */}
        
        km
      </Text>
    </View>

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

// const searchFilter = (text) => {
//   if (text) {
//     const newData = filteredCategory.filter((item) => {
//       const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
//       const textData = text.toUpperCase();
//       return itemData.indexOf(textData) > -1;
//     });
//     setfilterData(newData);
//     setsearch(text);
//   } else {
//     setfilterData(storeData);
//     setsearch(text);
//   }
// };
