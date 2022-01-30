import React, { useState } from "react";
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

// import { database } from "../firebase";
// import { addDoc, collection, doc, setDoc } from "firebase/firestore";
// import {connect} from "react-redux";

// refer MenuItem in youtube
// import { useDispatch } from "react-redux";

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
});

// const mapDispatchToProps = (dispatch) =>{
//   return{
//     addItemToCart:(product) =>dispatch({type:'ADD_TO_CART', payload:product})
//   }
// }
export default function AboutFood({ navigation }, props) {
  
  const [cart, setCart] = useState([]);
  const [foods] = useState([
    {
      title: "Apple",
      weight: "Weight: 1.2 kg",
      expirydate: "Expire Date: 04-01-2022",
      stock: "Stock: 3",
      price: "RM 10.00",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/apples-at-farmers-market-royalty-free-image-1627321463.jpg?crop=1.00xw:0.631xh;0.00160xw,0.206xh&resize=980:*",
    },

    {
      title: "Banana",
      weight: "Weight: 1.2 kg",
      expirydate: "Expire Date: 04-01-2022",
      stock: "Stock: 1",
      price: "RM 5.00",
      image:
        "https://cdn1.sph.harvard.edu/wp-content/uploads/sites/30/2018/08/bananas-1354785_1920-1200x800.jpg",
    },
    {
      title: "Potato",
      weight: "Weight: 1.2 kg",
      expirydate: "Expire Date: 04-01-2022",
      stock: "Stock: 2",
      price: "RM 15.00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVASnErn64-EuhrxfcL2AB3fyINkudRk3zeA&usqp=CAU",
    },
  ]);

  const addToCart = (food) =>{
    
    setCart([...cart, food]);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {foods.map((food, index) => (
          <View key={index}>
            {/*<TouchableOpacity > onPress={()=> props.addItemToCart()} */}
            {/* <TouchableOpacity  onPress={() => navigation.navigate("Food Details")}> */}
            {/* <TouchableOpacity> */}
              <View style={styles.foodItemStyle}>
                {
                  // <BouncyCheckbox
                  //   iconStyle={{ borderColor: "lightgray", borderRadius: 6 }}
                  //   fillColor="#4EB574"
                  //   onPress={()=> selectItem(food)}
                  // />
                }
                {/* onPress={props.addItemToCart()} */}
                <FoodImage food={food} />
                <FoodInfo food={food} />
                
                <Icon icon="shopping-cart" 
                onPress={()=> addToCart(food)}/>
                <FoodDetails mycart = {cart}/>
                
              </View>
            {/* </TouchableOpacity> */}
            {/* <Divider
              width={0.5} 
              orientation="vertical"
              style={{ marginHorizontal: 10 }}
            /> */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// export default AboutFood;
// export default connect(null, mapDispatchToProps)(AboutFood);
// export default function AboutFood() {

//   // const dispatch = useDispatch();
//   // const selectItem = (item) =>
//   //   dispatch({
//   //     type: "ADD_TO_CART",
//   //     payload: item,
//   //   });

//   return (
//     <View style={{ flex: 1 }}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {foods.map((food, index) => (
//           <View key={index}>
//             <View style={styles.foodItemStyle}>
//               {
//                 <BouncyCheckbox
//                   iconStyle={{ borderColor: "lightgray", borderRadius: 6 }}
//                   fillColor="#4EB574"
//                   onPress={()=> selectItem(food)}
//                 />
//               }
//               <FoodInfo food={food} />
//               <FoodImage food={food} />
//             </View>
//             {/* <Divider
//               width={0.5}
//               orientation="vertical"
//               style={{ marginHorizontal: 10 }}
//             /> */}
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

const FoodInfo = (props) => (
  <View style={{ width: 235, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text>{props.food.weight}</Text>
    <Text>{props.food.expirydate}</Text>
    <Text>{props.food.stock}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage = (props) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
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