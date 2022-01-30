import { View, Text, TouchableOpacity} from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {connect} from "react-redux";

const BottomCartIcon = (props) => (
  <View>
    <View
      style={{
        position: "absolute",
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: "#116530",
        left: 15,
        bottom: 30,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>0</Text>
    </View>

    <Icon icon="shopping-cart" text="Cart" />
  </View>
);

const mapStatetoProps =(state)=>{
  return{
    cartItems: state
  }
}
// export default connect (mapStatetoProps)(BottomCartIcon);
export default BottomCartIcon;
const Icon = (props) => (
  <TouchableOpacity>
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);