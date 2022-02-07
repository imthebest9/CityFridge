import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
//import { SearchBar } from 'react-native-elements';
import SearchBar from "../components/SearchBar";
import Stores from "../components/Stores";
import BottomTabsCustomer from "../components/BottomTabsCustomer";
import { ScrollView } from "react-native-gesture-handler";

export default function SearchStorePage({ navigation }) {
  return (
    <View style={{ flex: 1, marginTop: 30, flex: 1 }}>
      <ScrollView vertical>
        <TouchableOpacity onPress={() => navigation.navigate("Taddcart")}>
          <Stores navigation={navigation} />
        </TouchableOpacity>
      </ScrollView>

      <BottomTabsCustomer style={{ flex: 1 }} navigation={navigation}/>
    </View>
  );
}
