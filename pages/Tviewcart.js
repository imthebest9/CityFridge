import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import BottomTabsCustomer from "../components/BottomTabsCustomer";
import VpickupTime from "../components/Transaction/GenerateTac";
import VreserveButton from "../components/Transaction/VreserveButton";
import { Tcontext } from "./Tcontext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Tviewcart({ navigation }) {
 
  const [cart, setCart] = useContext(Tcontext);
  
  const removeFromCart = (Basket) => {
      setCart((cart) => cart.filter((c) => c.id !== Basket.id ));
  };

  // take function and inital value as parameters
  const totalPrice = cart.reduce(
    (accumulated, currentCart) => accumulated + currentCart.price,0 );
  const ans = totalPrice.toFixed(2);
  
  
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.IconStyle}> 🛒 My Cart</Text>
      <View style={{ flex: 3, borderBottomColor: "black", borderBottomWidth: 1 }}>
        <ScrollView showsVerticalScrollIndicator={true}>
          {cart.map((Basket) => ( 
            <View>
              <View style={styles.cartItemContainer}>
                <View style={styles.foodImageStyle}>
                  
                    <Image
                      source={{ uri: Basket.image }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 8,
                        position: "absolute",
                      }}
                    />
                </View>
                <View>
                  <Text style={styles.titleStyle}>{Basket.name} </Text>
                  <Text style={styles.priceTitle}> RM {Basket.price} </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => removeFromCart(Basket)}>
                  <Icon icon="trash"/>
                  </TouchableOpacity>
                </View>
              </View>
              
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.titleStyle}>TOTAL:           RM {ans}</Text>
      </View>
      <View>
        <VreserveButton />
      </View>
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
      size={30}
      style={{
        
        zIndex: 999,
        marginLeft: 150,
        // right: -150,
        position: "relative",
        color: "#FFB84E",
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
    // zIndex: 99999,
    backgroundColor: "#D3D3D3",
  },

  foodImageStyle: {
    width: 90,
    height: 100,
    marginLeft: 10,
  },

  titleStyle: {
    flex: 1,
    fontSize: 19,
    fontWeight: "bold",
    padding: 15,
    left: 10,
  },

  priceTitle: {
    flex: 1,
    fontSize: 19,
    color: "red",
    marginTop: -20,
    padding: 10,
    left: 10,
  },
});
