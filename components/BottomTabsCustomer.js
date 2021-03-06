import React, { useContext } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { Tcontext } from "../pages/Tcontext";

export default function BottomTabsCustomer({navigation}) {
  const [cart, setCart] = useContext(Tcontext);
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 10,
        justifyContent: "space-around",
        width: "100%"
      }}
    >
      <Icon icon="home" text="Home" />
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
          <Text style={{ color: "white", fontWeight: "bold" }}>{cart.length}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ViewCart")}>
          <Icon2 icon="shopping-cart" text="Cart" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
      <Icon2 icon="user-alt" text="Profile" /> 
      </TouchableOpacity>
    </View>
  );
}

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

const Icon2 = (props) => (
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
);
