import React, {useState, useEffect} from 'react'
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity
    } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from '../components/SwitchSelector';
import {useIsFocused } from '@react-navigation/native';

export default function UserProfile({navigation, route}) {
    const {styles} = route.params;
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [isVendor, setIsVendor] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    var user;

    const getData = async() => {
        try{
            await AsyncStorage.getItem('UserData').then(
                value => {
                    if (value != null){
                        user = JSON.parse(value);
                        setUsername(user.username);
                        setName(user.name);
                        setMobile(user.mobile);
                        setEmail(user.email);
                        setLocation(user.location);
                        setAddress(user.address);
                        setIsVendor(user.isVendor);
                    }
                }
            )
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getData();
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
                    {name}
                </Text>
                <Text style={styles.locationFont}>
                    {location}
                </Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Address</Text> 
                        <Text style={styles.infoBodyFont}>{address}</Text>
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Contact Number</Text> 
                        <Text style={styles.infoBodyFont}>{mobile}</Text>
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Email</Text> 
                        <Text style={styles.infoBodyFont}>{email}</Text>
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
                            15 kg
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