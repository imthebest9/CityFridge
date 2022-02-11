import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import DropdownMenu from "react-native-dropdown-menu";
import { createStackNavigator } from "@react-navigation/stack";

export default function DDMenu() {

  const optSmtg = ()=>{
      console.log("random phrase");
  }
  const [category, setStoreCategory] = useState();
  const data = [["C", "Java", "JavaScript", "PHP"]];
  // var data = [["C", "Java", "JavaScript", "PHP"], ["Python", "Ruby"], ["Swift", "Objective-C"]];
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 64 }} />
      <DropdownMenu
        style={{ flex: 1 }}
        bgColor={"white"}
        tintColor={"#666666"}
        activityTintColor={"green"}
        // arrowImg={}
        // checkImage={}
        // optionTextStyle={{color: '#333333'}}
        // titleStyle={{color: '#333333'}}
        // maxHeight={300}
        handler={(selection,row) =>{
            // setStoreCategory({text: data[selection]});
            setStoreCategory({ text: data[selection][row] });
            console.log("Hi");
            console.log("Category",category);
            optSmtg();
        }
        
        }
        data={data}
      >
        <View style={{ flex: 1 }}>
          <Text>
            is the best language in the world
            {//console.log("down", category.text)    
            }
          </Text>
        </View>
      </DropdownMenu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  big: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
  },
});
