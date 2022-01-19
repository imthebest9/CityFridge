import { useIsFocused } from '@react-navigation/native';
import React, {useState, useEffect} from 'react'
import {
    FlatList, SafeAreaView, StyleSheet, View, Text, TextInput
} from 'react-native';
import { database } from "../firebase";

// import { View, Text } from 'react-native'
// import { FlatList } from 'react-native-gesture-handler';
// import { styles } from '../pages/SignIn';

export default function SearchBar() {
    const [filteredData, setfilterData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setsearch] = useState('');

    const [storeData, setStoreData] = useState([]);

    useEffect(async () => {
        const querySnapshot = await getDocs(collection(database, "Stores"));
        const saveFirebaseItems = [];
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        saveFirebaseItems.push(doc.data());
        });
        setStoreData(saveFirebaseItems);
    }, [useIsFocused()]);


    useEffect(() => {
        fetchPosts();
        return () => {

        }
    },[])

    const fetchPosts = () => {
        // const apiURL = 'https://jsonplaceholder.typicode.com/posts';
        // fetch(apiURL)
        // .then((response) => response.json())
        // .then((responseJson) => {
        //     setfilterData(responseJson);
        //     setmasterData(responseJson); 
        // }).catch((error) => {
        //     console.error(error);
        // })
        setfilterData(storeData);
        setmasterData(storeData); 
    }

    const searchFilter = (text) => {
        if(text) {
            const newData = masterData.filter((item) => {
                const itemData = item.title ?
                                item.title.toUpperCase()
                                : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilterData(newData);
            setsearch(text);
        } else {
            setfilterData(masterData);
            setsearch(text);
        }
    }

    const ItemView = ({item}) => {
        return (
            <Text style={styles.itemStyle}>
                {item.id}{'. '}{item.title.toUpperCase()}
            </Text>
        )
    }

    const ItemSeperatorView = () => {
        return (
            <View 
                style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}
            />
                
        )
    }
    
    return (
        <View>
            <TextInput
                style={styles.textInputStyle}
                // defaultValue = ''
                placeholder="Search Here"
                underlineColorAndroid="transparent"
                onChangeText={(text) => searchFilter(text)}
            />
            <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                ItemSeperatorComponent={ItemSeperatorView}
                renderItem={ItemView}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        backgroundColor: 'blue',
    },
    itemStyle: {
        padding: 15
    },
    textInputStyle: {
        height: 50,
        borderWidth: 1,
        paddingLeft:20 ,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: 'white'
    }
});