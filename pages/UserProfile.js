import React, {useState, useEffect} from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    Dimensions,
    StyleSheet
    } from 'react-native'
import SwitchSelector from '../components/SwitchSelector'
import BottomTabsVendor from "../components/vendor/BottomTabsVendor";
import BottomTabsCustomer from "../components/BottomTabsCustomer";
import { StackActions, useIsFocused } from '@react-navigation/native'
import { auth, database, storage } from "../firebase";
import { doc, getDoc } from "firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDownloadURL, ref } from 'firebase/storage'

export default ({navigation})=>{
    const [data, setData] = useState([])
    const [isVendor, setIsVendor] = useState(false)
    const [history, setHistory] = useState([])
    const [historyList, setHistoryList] = useState([])
    const [selectedOption, setSelectedOption] = useState(1)
    const [image, setImage] = useState(null)

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                AsyncStorage.getItem("profile").then(profile=>{
                    if(profile=="vendors")
                    setIsVendor(true)
                    getDoc(doc(database, profile, user.uid)).then(async(userDoc)=>{
                        setData(userDoc.data())
                        const url = userDoc.data().image_url
                        if(url == null)
                        setImage(await getDownloadURL(ref(storage, "logo.jpeg")))
                        else
                        setImage(url)
                    })
                })
                getDoc(doc(database, "history", user.uid)).then(historyDoc=>{
                    setHistory(historyDoc.data())
                })
            }
            else{
                navigation.dispatch(
                    StackActions.replace('Sign In')
                );
            }
        })
    }, [useIsFocused()])

    const pushHistory = async()=>{
        var list = []
        const reservations = history["reservations"]
        for(var i = reservations.length-1; i>=0; i--){
            list.push(await reservationDetail(reservations[i], i))
        }
        setHistoryList(list)
    }

    const reservationDetail = async(reservationID, key)=>{
        const reservationData = (await getDoc(doc(database, "reservations", reservationID))).data()
        const reservationDate = reservationData["date"].toDate()
        const date = reservationDate.toDateString().split(" ")
        var time = reservationDate.toLocaleTimeString().substr(0,5)
        const hour = parseInt(time.substr(0,2))
        if(hour==12)
        time += " PM"
        else if(hour>12)
        time = time.replace(`${hour}`, hour-12) + " PM"
        else
        time += " AM"

        var foodList = ""
        for (var foodID in reservationData["foods"]){
            const foodData = (await getDoc(doc(database, "foods", foodID))).data()
            foodList += foodData["name"] + " x " + reservationData["foods"][foodID] + "\n"
        }
        foodList = foodList.trimEnd()
        const username = data["isVendor"] ? reservationData["clientUsername"] : reservationData["vendorUsername"]
        return{
            key: key,
            data: reservationData,
            isComplete: reservationData["isComplete"],
            date: date,
            day: reservationDate.getDay(),
            time: time,
            isVendor: data["isVendor"],
            username: username,
            foodList: foodList
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            </View>
            <View style={styles.profilePicFrame}>
                <Image
                style={styles.profilePic}
                source={{uri: image }}
                resizeMode='contain'
                />
            </View>
            {
                (selectedOption==1) ?
                (<View style={styles.profileContainer}>
                <Text style={styles.nameFont}>
                    {data['name']}
                </Text>
                <Text style={styles.locationFont}>
                    {data['location']}
                </Text>
                {isVendor && 
                <View>
                    <Text style={styles.descriptionFont}>
                        {data['description']}
                    </Text>
                    <View  style={styles.contributionTitleContainer}>
                        <Text style={styles.contributionTitleFont}>
                            Rating: {data['review'] && data['review'].toFixed(1)}
                        </Text>
                    </View>
                </View>
                }
                <View style={styles.infoContainer}>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Address</Text> 
                        <Text style={styles.infoBodyFont}>{data['address']}</Text>
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Contact Number</Text> 
                        <Text style={styles.infoBodyFont}>{data['contact']}</Text>
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Email</Text> 
                        <Text style={styles.infoBodyFont}>{data['email']}</Text>
                    </View>
                </View>
                {!isVendor && <View style={styles.contributionContainer}>
                    <View style={styles.contributionTitleContainer}>
                        <Text style={styles.contributionTitleFont}>
                            Total Contribution
                        </Text>
                    </View>
                    <View style={styles.contributionInfoContainer}>
                        <Text style={styles.contributionInfoFont}>
                            {history["contribution"]} kg
                        </Text>
                        <Text style={styles.contributionInfoBodyFont}>
                            of foods have been saved
                        </Text>
                    </View>
                </View>}
            </View>) :
            (
            <View style={styles.profileContainer}>
                {historyList.length==0 ?
                <View>
                    <Text style={styles.nameFont}>
                        Loading
                    </Text>
                </View>:
                <FlatList
                data={historyList}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.historyRowContainer}
                    onPress={() => {
                        navigation.navigate('History', {
                        data: item.data,
                        date: item.date,
                        day: item.day,
                        time: item.time,
                        isVendor: item.isVendor,
                        username: item.username
                        })}}>
                        <View style={[styles.historyDateContainer, {backgroundColor: item.isComplete ? '#f6f6f6' : '#4EB574'}]}>
                            <Text style={styles.historyTitleFont}>
                                {item.date[1]}
                            </Text>
                            <Text style={styles.historyTitleFont}>
                                {item.date[2]}
                            </Text>
                        </View>
                        <View style={styles.historyContainer}>
                            <Text style={styles.historyTitleFont}>
                                {item.username}
                            </Text>
                            <Text style={styles.historyBodyFont}>
                                {item.foodList}
                            </Text>
                        </View>
                        <Text style={styles.historyTimeFont}>
                            {item.time}
                        </Text>
                    </TouchableOpacity>
                )}/>}
                {isVendor && <View style={styles.contributionContainer}>
                    <View style={styles.contributionTitleContainer}>
                        <Text style={styles.contributionTitleFont}>
                            Total Contribution
                        </Text>
                    </View>
                    <View style={styles.contributionInfoContainer}>
                        <Text style={styles.contributionInfoFont}>
                            {history["contribution"]} kg
                        </Text>
                        <Text style={styles.contributionInfoBodyFont}>
                            of foods have been saved
                        </Text>
                    </View>
                </View>}
            </View>
            )
            }
            <View style={styles.footer}>
                <SwitchSelector
                    selectionOption={1}
                    optionLeft={'Profile'}
                    optionRight={'History'}
                    onSelectSwitch={option=>{
                        setSelectedOption(option)
                        if(option==2)
                        pushHistory()
                        }
                    }/>
            </View>
            {isVendor ? <BottomTabsVendor navigation={navigation}/> : <BottomTabsCustomer navigation={navigation}/>}
        </View>
    )
}

const width = Dimensions.get("screen").width;
const componentWidth = width * 0.8;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        flex: 1,
        alignItems: "center",
        width: componentWidth,
    },
    textInput: {
        backgroundColor: "#f6f6f6",
        borderRadius: 5,
        padding: 10,
        margin: 7,
        width: "100%",
        color: "#000",
        fontSize: 16,
        fontFamily: "MerriweatherSans_400Regular"
    },
    button: {
        backgroundColor: "#4EB574",
        borderRadius: 50,
        padding: 10,
        marginVertical: 10,
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Merriweather_400Regular"
    },
    logo: {
        margin: 20,
        height: width * 0.3,
    },
    header:{
        backgroundColor: '#116530',
        width: width,
        height: 70,
        marginBottom: -70,
        alignItems: 'center'
    },
    profilePicFrame:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 120,
        width: 120,
        margin: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 80,
        overflow: 'hidden'
    },
    profilePic: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 80,
        height: 120,
        width: 120,
    },
    profileContainer:{
        flex: 1,
        alignItems: 'center',
        marginBottom: 15,
        width: componentWidth
    },
    nameFont:{
        color: '#116530',
        fontSize: 20,
        fontFamily: "Merriweather_700Bold",
        textAlign: 'center'
    },
    locationFont:{
        color: '#000',
        fontSize: 18,
        fontFamily: "Merriweather_400Regular",
        marginBottom: 10
    },
    descriptionFont:{
        color: '#000',
        fontSize: 15,
        fontFamily: "Merriweather_300Light",
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10
    },
    infoContainer:{
        backgroundColor: '#f6f6f6',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'flex-start',
        width: componentWidth
    },
    infoRowContainer:{
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center'
    },
    infoTitleFont:{
        color: '#116530',
        paddingRight: 10,
        fontFamily: "Merriweather_400Regular"
    },
    infoBodyFont:{
        color: 'black',
        flexShrink: 1,
        fontFamily: "MerriweatherSans_300Light_Italic"
    },
    contributionContainer:{
        width: 250
    },
    contributionTitleContainer:{
        backgroundColor: '#4EB574',
        borderRadius: 5,
        paddingVertical: 7,
        marginVertical: 10
    },
    contributionTitleFont:{
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: "Merriweather_400Regular"
    },
    contributionInfoContainer:{
        backgroundColor: '#f6f6f6',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center'
    },
    contributionInfoFont: {
        color: '#4EB574',
        fontSize: 20,
        fontFamily: "Merriweather_900Black"
    },
    contributionInfoBodyFont:{
        color: 'black',
        margin: 5,
        fontFamily: "MerriweatherSans_300Light_Italic"
    },
    historyRowContainer:{
        flexDirection: 'row',
        width: width*0.9,
        paddingVertical: 10,
        borderBottomColor: '#bdbdbd',
        borderBottomWidth: 1,
    },
    historyDateContainer:{
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60
    },
    historyContainer:{
        width: '60%',
        marginHorizontal: 10
    },
    historyTitleFont:{
        color: 'black',
        fontSize: 18,
        fontFamily: "Merriweather_400Regular"
    },
    historyBodyFont:{
        color: 'black',
        fontSize: 14,
        fontFamily: "MerriweatherSans_300Light_Italic"
    },
    historyTimeFont:{
        color: '#bdbdbd',
        fontSize: 14,
        fontFamily: "Merriweather_400Regular"
    },
    footer:{
        paddingBottom: 10
    },
    settingTextInput: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 7,
        width: '100%',
        color: '#000',
        fontSize: 16,
        flexShrink: 1
    },
    button: {
        backgroundColor: "#4EB574",
        borderRadius: 50,
        padding: 10,
        marginVertical: 10,
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Merriweather_400Regular"
    }
});