import React, {useState, useEffect} from 'react'
import { useIsFocused } from '@react-navigation/native'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { database } from "../firebase"
import { doc, getDoc } from 'firebase/firestore';


export default ({route})=>{
    const {data, date, day, time, isVendor} = route.params
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Firday", "Saturday"]
    const [weight, setWeight] = useState()
    const [price, setPrice] = useState()
    const [history, setHistory] = useState([])

    useEffect(async() => {
        var totalWeight = 0
        var totalPrice = 0
        var foodList = []
        for (var foodID in data["food"]){
            const quantity = data["food"][foodID]
            const foodData = (await getDoc(doc(database, "foods", foodID))).data()
            const weight = Math.round(foodData["weight"]*quantity*100)/100
            totalWeight += weight
            const price = foodData["price"] * quantity
            totalPrice += price
            foodList.push(historyItem(foodData["name"] + " x " + quantity, weight, price.toFixed(2)))
        }
        setWeight(totalWeight)
        setPrice(totalPrice.toFixed(2))
        setHistory(foodList)
    }, [useIsFocused()])
    
    const historyItem = (item, weight, price)=>{
        return(
            <View style={styles.insightRowContainer}>
                <View style={styles.insightLargeColumnContainer}>
                    <View style={styles.itemBullet}>
                    </View>
                    <Text style={styles.itemFont}>
                        {item}
                    </Text>
                </View>
                <View style={styles.insightSmallColumnContainer}>
                    <Text style={styles.itemFont}>
                        {weight}
                    </Text>
                </View>
                <View style={styles.insightSmallColumnContainer}>
                    <Text style={styles.itemFont}>
                        {price}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.insightTimeAndDateContainer}>
                <View style={styles.insightDateContainer}>
                    <Text style={styles.insightDateFont}>
                        {date[1] + " " + date[2] + ", " + date[3]}
                    </Text>
                </View>
                <View style={styles.insightDayAndTimeContainer}>
                    <View style={styles.insightDayContainer}>
                        <Text style={styles.insightDayAndTimeFont}>
                            {weekdays[day]}
                        </Text>
                    </View>
                    <View style={styles.insightTimeContainer}>
                        <Text style={styles.insightDayAndTimeFont}>
                            {time}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.insightContainer}>
                <Text style={styles.insightStoreFont}>
                {isVendor ? data["clientUsername"] : data["vendorUsername"]}
                </Text>
                <View style={styles.insightRowContainer}>
                    <View style={styles.insightLargeColumnContainer}>
                        <Text style={styles.insightTitleFont}>
                            Items
                        </Text>
                    </View>
                    <View style={styles.insightSmallColumnContainer}>
                        <Text style={styles.insightTitleFont}>
                            Weight
                        </Text>
                    </View>
                    <View style={styles.insightSmallColumnContainer}>
                        <Text style={styles.insightTitleFont}>
                            Price
                        </Text>
                    </View>
                </View>
                <ScrollView style={{maxHeight:180}}>
                    {history}
                </ScrollView>
                <View style={styles.insightTotal}>
                    <View style={styles.insightRowContainer}>
                        <View style={styles.insightLargeColumnContainer}>
                            <Text style={styles.insightTitleFont}>
                                TOTAL
                            </Text>
                        </View>
                        <View style={styles.insightSmallColumnContainer}>
                            <Text style={styles.insightTitleFont}>
                            {weight} kg
                            </Text>
                        </View>
                        <View style={styles.insightSmallColumnContainer}>
                            <Text style={styles.insightTitleFont}>
                            RM {price}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text style={styles.verificationCode}>
                {
                (true) ?
                "Code: 214" : "Completed"
                }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
},
itemFont:{
    color: 'black',
    fontSize: 14,
    fontFamily: "MerriweatherSans_300Light_Italic"
},
insightTimeAndDateContainer:{
    backgroundColor: '#f6f6f6',
    borderRadius: 15,
    height: 130,
    width: '65%',
    marginVertical: 30
},
insightDateContainer:{
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
},
insightDateFont:{
    color: '#4EB574',
    fontSize: 25,
    fontFamily: "Merriweather_700Bold",
},
insightDayAndTimeContainer:{
    flexDirection: 'row',
    height: '45%',
    width: '100%',
    borderTopWidth: 5,
    borderTopColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
},
insightDayContainer:{
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderRightColor: 'white'
},
insightTimeContainer:{
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    borderLeftWidth: 2,
    borderLeftColor: 'white'
},
insightDayAndTimeFont:{
    color: 'black',
    fontSize: 16,
    fontFamily: "MerriweatherSans_400Regular",
    textAlign: 'center'
},
insightContainer:{
    alignItems: 'center',
    width: '95%'
},
insightStoreFont:{
    color: 'black',
    fontSize: 20,
    fontFamily: "Merriweather_700Bold",
    marginBottom: 20
},
insightRowContainer:{
    flexDirection: 'row',
    marginVertical: 10,
},
insightLargeColumnContainer:{
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10
},
insightSmallColumnContainer:{
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center'
},
insightTitleFont:{
    color: 'black',
    fontSize: 16,
    fontFamily: "Merriweather_700Bold"
},
itemBullet:{
    backgroundColor: '#4EB574',
    height: 15,
    width: 15,
    borderRadius: 8,
    marginRight: 10
},
insightTotal:{
    marginVertical: 5,
    borderColor: '#bdbdbd',
    borderTopWidth: 2,
    borderBottomWidth: 2
},
verificationCode:{
    color: '#4EB574',
    fontSize: 25,
    fontFamily: "Merriweather_700Bold",
    margin: 30
}
});