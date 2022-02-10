import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
//import { SearchBar } from 'react-native-elements';
import SearchBar from "../components/SearchBar";
import Stores from "../components/Search/Stores";
import Foods from "../components/Search/Foods";
import StoreHeaderTab from "../components/Search/StoreHeaderTab";
import BottomTabsCustomer from "../components/BottomTabsCustomer";
import { ScrollView } from "react-native-gesture-handler";
import location from '../pages/TestMapPage';

export default function SearchStorePage({ navigation }) {
  const [activeTab, setActiveTab] = useState("Store");
  console.log(location);
  return (
    <View style={{ flex: 1, marginTop: 30, flex: 1 }}>
      {/* <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={{ backgroundColor: "white", padding: 15, marginTop: -30 }}>
          <StoreHeaderTab activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>
      </View>

      {activeTab === "Store" ? (
        <View>
          <ScrollView vertical>
            <TouchableOpacity onPress={() => navigation.navigate("Taddcart")}>
              <Stores navigation={navigation} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      ) : (
        <View>
          <Foods />
        </View>
      )} */}
      
      <ScrollView vertical>
        <TouchableOpacity onPress={() => navigation.navigate("Taddcart")}>
          <Stores navigation={navigation} />
        </TouchableOpacity>
      </ScrollView>
      

      <BottomTabsCustomer style={{ flex: 1 }} navigation={navigation}/>
    </View>
  );
}
