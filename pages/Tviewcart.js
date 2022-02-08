import React, { useContext } from "react";
import { View, Text, StyleSheet, Image,TouchableOpacity} from "react-native";
import BottomTabsCustomer from "../components/BottomTabsCustomer";
import VpickupTime from "../components/Transaction/GenerateTac";
import VreserveButton from "../components/Transaction/VreserveButton";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";
import { Tcontext } from "./Tcontext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


export default function Tviewcart({ navigation }) {
  const [cart, setCart] = useContext(Tcontext);
 
  const removeFromCart = async (food)=>{ 
  const obj = { name: food.name, price: food.price, image: food.image_url};
  await setCart(currentCart => currentCart.filter((currentCart)=> currentCart.food !== food));
    
  }
  // take function and inital value as parameters
  const totalPrice = cart.reduce(
    (accumulated, currentCart) => accumulated + currentCart.price,
    0
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.IconStyle}> 🛒 My Cart</Text>
      <View style={{ flex: 1 }}>
        {cart.map((basket) => (
          <View>
            <View style={styles.cartItemContainer}>
              <View style={styles.foodImageStyle}>
                <Image
                  source={{ uri: basket.image }}
                  style={{
                    width: 100, height: 100, borderRadius: 8,
                    position: "absolute",
                  }}
                />
              </View>
              <View>
                <Text style={styles.titleStyle}>{basket.name} </Text>
                <Text style={styles.priceTitle}> RM {basket.price} </Text>
              </View>
              <View style={{ flex: 1}}>
              <TouchableOpacity >
                {/* onPress={ () => removeFromCart(food)} */}
                <Icon icon="trash" /> 
              </TouchableOpacity>
              </View>

            </View>
          </View>
        ))}
        <View style={{ flex: 1 }}>
      <Text>TOTAL: {totalPrice}</Text>
      </View>
      </View>
      

      {/* <View style={styles.content}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          Apple {cart.length}
        </Text>
        <Text style={{ opacity: 0.7, fontSize: 16 }}>RM 10.00</Text>
        <Text>TOTAL: {totalPrice}</Text>
      </View> */}

      <VreserveButton />
      <View>
        
        <BottomTabsCustomer style={{ flex: 1 }} navigation={navigation} />
      </View>
    </View>
  );
}


const Icon = (props) => (
  <View>
    <FontAwesome5
    
      name={props.icon}
      size={25}
      style={{
        zIndex : 1 ,
        flex:1,
        position: "absolute",
        right:0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between",
        color: "#FFB84E"

      }}
    />
  </View>
);

const styles = StyleSheet.create({
  IconStyle: {
    marginTop: 10,
    marginHorizontal: 15,
    fontSize: 18,
    textAlign: "center",
  },

  cartItemContainer: {
    
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 100,
    backgroundColor: "#D3D3D3",
  },

  foodImageStyle: {
    width: 90,
    height: 100,
    marginLeft: 10,
  },

  titleStyle: {
    flex:1,
    fontSize: 19,
    fontWeight: "bold",
    padding: 15,
    left:10
  },

  priceTitle: {
    flex:1,
    fontSize: 19,
    color: "red",
    marginTop:-20,
    padding: 10,
    left:10
  },

  
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#999",
  },
});
