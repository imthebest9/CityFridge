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

const StoreData = [
  {
    name: "Happy Mart",
    image_url: "https://www.penang-traveltips.com/pics/happy-mart.jpg",
    description: "Family mart give you family.",
    price: "RM",
    review: 4.5,
  },
  {
    name: "Family Mart",
    image_url:
      "https://3.bp.blogspot.com/-fwmjIUG7h1k/WLkXBO4HEUI/AAAAAAAAUF0/RRk5Qo2ioyUlSO7XZDy8AN2lMWq2CA27wCLcB/s1600/01.jpg",
    description:
      "FamilyMart is Japan's second largest convenience store chain, behind 7-Eleven. There are now 24,574 stores worldwide in Japan, Taiwan, China, Philippines, Thailand, Vietnam, Indonesia, and Malaysia.[4] Its headquarters is on the 17th floor of the Sunshine 60 building in Ikebukuro, Toshima, Tokyo.[5] There are some stores in Japan with the name Circle K Sunkus under the operation of FamilyMart. FamilyMart was, until 2020, a subsidiary of the FamilyMart UNY Holdings Co., Ltd. (UFHD), which also owned supermarket chain Uny. UFHD was dissolved when Uny was acquired by the parent company of Don Quijote in 2020. FamilyMart Co.'s parent company is Itochu, a Japanese trading company, with a stake of 50.1%.[3] On July 8, 2020, Itochu announced it will spend approximately ¥580 billion (approx $5.5 billion) to purchase 100% of FamilyMart, with the intent to sell 4.9% of the shares to Zen-Noh and Norinchukin Bank.[6] FamilyMart shareholders approved the takeover on October 26, with the stock scheduled to be delisted on November 12.[7] All of the usual Japanese convenience store goods such as basic grocery items, magazines, manga, soft drinks, alcoholic drinks like sake, nikuman, fried chicken, onigiri, and bento are available. FamilyMart is known for its distinctive doorbell melody, which is played upon entering the store.[8] The doorbells are exclusively made by Panasonic, and the melody these doorbells play is referred to as Melody Chime No.1 – Daiseikyou, and was originally developed for Panasonic by Yasuhi Inada in 1978.[9",
    price: "RM",
    review: 4.5,
  },
  {
    name: "Lotus Super Market",
    image_url: "https://www.penang-traveltips.com/pics/happy-mart.jpg",
    description:
      "Stop Calling us Tesco !! WE ARE LOTUSSSSS. We are green, not blue. Want blue go look for Monday lalalalalallalalalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    price: "RM",
    review: 4.5,
  },
  {
    name: "KK Mart",
    image_url: "https://www.penang-traveltips.com/pics/happy-mart.jpg",
    description:
      "Stop Calling us Tesco !! WE ARE LOTUSSSSS. We are green, not blue. Want blue go look for Monday lalalalalallalalala",
    price: "RM",
    review: 4.5,
  },
  {
    name: "KK Mart",
    image_url: "https://www.penang-traveltips.com/pics/happy-mart.jpg",
    description:
      "Stop Calling us Tesco !! WE ARE LOTUSSSSS. We are green, not blue. Want blue go look for Monday lalalalalallalalala",
    price: "RM",
    review: 4.5,
  },
  {
    name: "KK Mart",
    image_url: "https://www.penang-traveltips.com/pics/happy-mart.jpg",
    description:
      "Stop Calling us Tesco !! WE ARE LOTUSSSSS. We are green, not blue. Want blue go look for Monday",
    price: "RM",
    review: 4.5,
  },
];

export default function Stores({ navigation }) {
  const [storeData, setStoreData] = useState([]);
  const [storeCategory, setStoreCategory] = useState('All');
  const [filteredCategory, setfilterCategory] = useState([]);
  const [filteredData, setfilterData] = useState([]);
  const [search, setsearch] = useState("");

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
    return () => {};
  }, []);

  const fetchPosts = () => {
    setfilterData(storeData);
    setStoreData(storeData);
  };

  const categoryFilter = (text) =>{
    if(text!=='All') {
      const newData = storeData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterCategory(newData);
    } else if (text==='All') {
      setfilterCategory(storeData);
    }
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = filteredCategory.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setsearch(text);
    } else {
      setfilterData(storeData);
      setsearch(text);
    }
  };

  ///////////////////////////////////////////

  return (
    <View>
      <View>
        <Text>Filter By Category </Text>
      </View>
      {/* <button className="previous-round" onClick={() => setOrderData_(previous(orderData_))}
></button>   */}
      <TouchableOpacity onPress={() => categoryFilter('All')}>
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
      </TouchableOpacity>

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

              <StoreInfo name={Store.name} description={Store.description} />
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
