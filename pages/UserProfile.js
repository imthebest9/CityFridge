import React, {useState, useEffect} from 'react'
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity
    } from 'react-native'
import SwitchSelector from '../components/SwitchSelector'
import { StackActions, useIsFocused } from '@react-navigation/native';
import { auth, database } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

export default function UserProfile({navigation, route}) {
    const {styles} = route.params
    const [data, setData] = useState([])
    const [selectedOption, setSelectedOption] = useState(1)

    const user = auth.currentUser

    useEffect(()=>{
        if(user){
            getDoc(doc(database, "users", user.uid)).then((docSnap)=>{
                setData(docSnap.data())
            });
        }
        else{
            navigation.dispatch(
                StackActions.replace('Sign In')
            );
        }
    }, [useIsFocused()])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profilePicFrame}>
                    <Image
                    source={require('../assets/logo.png')}
                    style={styles.profilePic}
                    resizeMode='contain'
                    />
                </View>
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
                <View style={styles.infoContainer}>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Address</Text> 
                        <Text style={styles.infoBodyFont}>{data['address']}</Text>
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Contact Number</Text> 
                        <Text style={styles.infoBodyFont}>{data['mobile']}</Text>
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Email</Text> 
                        <Text style={styles.infoBodyFont}>{data['email']}</Text>
                    </View>
                </View>
                <View style={styles.contributionContainer}>
                    <View style={styles.contributionTitleContainer}>
                        <Text style={styles.contributionTitleFont}>
                            Total Contribution
                        </Text>
                    </View>
                    <View style={styles.contributionInfoContainer}>
                        <Text style={styles.contributionInfoFont}>
                            {data['contribution']} kg
                        </Text>
                        <Text style={styles.contributionInfoBodyFont}>
                            of foods have been saved
                        </Text>
                    </View>
                </View>
            </View>) :
            (<View style={styles.profileContainer}>
                <ScrollView>
                    <TouchableOpacity style={styles.historyRowContainer}
                    onPress={() => {navigation.navigate('History')}}>
                        <View style={styles.historyDateContainer}>
                            <Text style={styles.historyTitleFont}>
                                NOV
                            </Text>
                            <Text style={styles.historyTitleFont}>
                                13
                            </Text>
                        </View>
                        <View style={styles.historyContainer}>
                            <Text style={styles.historyTitleFont}>
                                Uncle Potato Store
                            </Text>
                            <Text style={styles.historyBodyFont}>
                                Big Big Potato x 1
                            </Text>
                            <Text style={styles.historyBodyFont}>
                                Sweet Potato Chips x 1
                            </Text>
                        </View>
                        <Text style={styles.historyPriceFont}>
                            RM 5.80
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.historyRowContainer}
                    onPress={() => {navigation.navigate('History')}}>
                        <View style={styles.historyDateContainer}>
                            <Text style={styles.historyTitleFont}>
                                NOV
                            </Text>
                            <Text style={styles.historyTitleFont}>
                                13
                            </Text>
                        </View>
                        <View style={styles.historyContainer}>
                            <Text style={styles.historyTitleFont}>
                                Uncle Potato Store
                            </Text>
                            <Text style={styles.historyBodyFont}>
                                Big Big Potato x 1
                            </Text>
                            <Text style={styles.historyBodyFont}>
                                Sweet Potato Chips x 1
                            </Text>
                        </View>
                        <Text style={styles.historyPriceFont}>
                            RM 5.80
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>)
            }
            <View style={styles.footer}>
                <SwitchSelector
                    selectionOption={1}
                    optionLeft={'Profile'}
                    optionRight={'History'}
                    onSelectSwitch={option=>{
                        setSelectedOption(option)
                        }
                    }/>
            </View>
        </View>
    )
}