import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BottomTabsCustomer from "../components/BottomTabsCustomer";
import { connect } from "react-redux";
import store from "../reducers/store";

const TShoppingCart = (props) => (
  <View>
  <View style={styles.container}>
   {/* {props.cartItems.length > 0?
    <product x {props.cartItems}/>
   : <Text>No items in your cart</Text> */}
  }
    
  </View>
</View>
);

const mapStatetoProps =(state)=>{
  return{
    cartItems: state
  }
}

 export default connect(mapStatetoProps)(TShoppingCart);
  
   

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
