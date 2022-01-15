import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
//import { SearchBar } from 'react-native-elements';
import SearchBar from "../components/SearchBar"
import Stores from "../components/Stores";
import BottomTabsCustomer from "../components/BottomTabsCustomer";

export default function SearchStorePage(){
    return(
        <View style={{ flex: 1 }}>
       
          
            <SearchBar />
            <Stores />
            <BottomTabsCustomer style={{ flex: 1}} />
        </View>
        
        
    );
}

