import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import BottomTabsCustomer from "../components/BottomTabsCustomer";
import VpickupTime from "../components/Transaction/GenerateTac";
import VreserveButton from "../components/Transaction/VreserveButton";
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";
import { Tcontext } from "./Tcontext";

export default function Tviewcart({ navigation }) {
  const [cart, setCart] = useContext(Tcontext);

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
                  // resizeMode="contain"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                />
              </View>
              <View>
                <Text style={styles.titleStyle}>{basket.name} </Text>
                <Text style={styles.priceTitle}> RM {basket.price} </Text>
              </View>
              <StepperInput>
                
              </StepperInput>

            </View>
          </View>
        ))}
      </View>

      {/* <View style={styles.content}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          Apple {cart.length}
        </Text>
        <Text style={{ opacity: 0.7, fontSize: 16 }}>RM 10.00</Text>
        <Text>TOTAL: {totalPrice}</Text>
      </View> */}

      {/* <VreserveButton /> */}
      {/* <FoodName title={basket.name}/>
              <FoodPrice price ={basket.price}/> */}
      <View>
        <BottomTabsCustomer style={{ flex: 1 }} navigation={navigation} />
      </View>
    </View>
  );
}

const FoodName = (props) => (
  <View>
    <Text>{props.title}</Text>
  </View>
);

const FoodPrice = (props) => (
  <View>
    <Text>RM {props.price}</Text>
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
    marginTop: 10,
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
    fontSize: 19,
    fontWeight: "bold",
    // marginTop: 5,
    padding: 15,
  },

  priceTitle: {
    fontSize: 19,
    // fontWeight: "bold",
    color: "red",
    marginTop:-20,
    padding: 10,
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
