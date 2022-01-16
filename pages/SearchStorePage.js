import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
//import { SearchBar } from 'react-native-elements';
import SearchBar from "../components/SearchBar"
import Stores from "../components/Stores";
import BottomTabsCustomer from "../components/BottomTabsCustomer";
import { ScrollView } from "react-native-gesture-handler";

export default function SearchStorePage(){
    return(
        <View style={{ flex: 1, marginTop:30, flex:1}}>        
            <SearchBar />
            <View style={{borderBottomWidth: 1, marginBottom:10 }}></View>
            <ScrollView vertical >
                
                <Stores />                
            </ScrollView>
            
            <BottomTabsCustomer style={{ flex: 1}} />
        </View>
        
        
    );
}
