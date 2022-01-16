import React from "react";
import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { doc, getDoc } from "firebase/firestore";
import { database } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

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
      "Happy mart make u happy. Please Buy with us. FamilyMart is Japan's second largest convenience store chain, behind 7-Eleven. There are now 24,574 stores worldwide in Japan, Taiwan, China, Philippines, Thailand, Vietnam, Indonesia, and Malaysia.[4] Its headquarters is on the 17th floor of the Sunshine 60 building in Ikebukuro, Toshima, Tokyo.[5] There are some stores in Japan with the name Circle K Sunkus under the operation of FamilyMart. FamilyMart was, until 2020, a subsidiary of the FamilyMart UNY Holdings Co., Ltd. (UFHD), which also owned supermarket chain Uny. UFHD was dissolved when Uny was acquired by the parent company of Don Quijote in 2020. FamilyMart Co.'s parent company is Itochu, a Japanese trading company, with a stake of 50.1%.[3] On July 8, 2020, Itochu announced it will spend approximately ¥580 billion (approx $5.5 billion) to purchase 100% of FamilyMart, with the intent to sell 4.9% of the shares to Zen-Noh and Norinchukin Bank.[6] FamilyMart shareholders approved the takeover on October 26, with the stock scheduled to be delisted on November 12.[7] All of the usual Japanese convenience store goods such as basic grocery items, magazines, manga, soft drinks, alcoholic drinks like sake, nikuman, fried chicken, onigiri, and bento are available. FamilyMart is known for its distinctive doorbell melody, which is played upon entering the store.[8] The doorbells are exclusively made by Panasonic, and the melody these doorbells play is referred to as Melody Chime No.1 – Daiseikyou, and was originally developed for Panasonic by Yasuhi Inada in 1978.[9",
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


export default function Stores() {
  const [store, setStore] = useState([]); 

  const [storeData, setStoreData] = useState([])

  useEffect(async() => {
    const querySnapshot = await getDocs(collection(database, "Stores"));
    const saveFirebaseItems = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      saveFirebaseItems.push(doc.data());
    });
    setStoreData(saveFirebaseItems);
  }, [useIsFocused()])

  return (
    
    <View
      style={{
        flexDirection: "row",
        marginTop: 10,
        marginRight: 10,
        flex: 1,
      }}
    >
      <ScrollView vertical>
        {storeData.map((Store, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              //marginTop: 10,
              paddingBottom: 10,
              paddingTop: 10,

              flex: 1,
              borderBottomWidth: 1,
            }}
          >
            <StoreImage image={Store.image_url} />
            <StoreInfo name={Store.name} description={Store.description} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const StoreImage = (props) => (
  <View
    style={{
      alignItems: "center",
      //   marginTop: 10,
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

            // justifyContent: "justify",
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

// export default function Stores() {
//     return (
//         <View
//             style = {{
//                 flexDirection: "row",
//                 marginTop: 10,
//             }}
//         >
//             <StoreImage/>
//             <StoreInfo/>
//         </View>
//     )
// }
