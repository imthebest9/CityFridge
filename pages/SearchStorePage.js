import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
//import { SearchBar } from 'react-native-elements';
import SearchBar from "../components/SearchBar"


export default function SearchStorePage(){
    return(
        <View style={{ flex: 1 }}>
            <View style={{ flex: 6 }}>
                <Text
                style={{
                    marginLeft: 20,
                    fontSize: 24,
                    fontFamily: "Merriweather_700Bold",
                }}
                >
                Back
                </Text>
            </View>

            <View style={{ flex: 6 }}>
                <Text
                    style={{
                        marginLeft: 20,
                        fontSize: 24,
                        fontFamily: "Merriweather_700Bold",
                    }}
                    >
                Search
                </Text>
            </View>

            <SearchBar />
        </View>
        
        
    );
}

