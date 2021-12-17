import React, {useState, useEffect} from 'react'
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions
    } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from '../components/SwitchSelector';

export default function UserProfile({navigation}) {
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [password, setPassword] = useState(null);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [isVendor, setIsVendor] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    var user;

    const width = Dimensions.get('screen').width;
    const componentWidth = width * 0.8;

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center'
        },
        form: {
          flex:1,
          alignItems: 'center',
          width: componentWidth
        },
        textInput: {
          flexDirection: 'row',
          backgroundColor: '#f6f6f6',
          borderRadius: 5,
          padding: 10,
          margin: 7,
          width: '100%',
          color: '#000',
          fontSize: 16,
        },
        button:{
          backgroundColor: '#4EB574',
          borderRadius: 50,
          padding: 10,
          margin: 10,
          width: '100%'
        },
        buttonText: {
          color: '#fff',
          fontSize: 16,
          textAlign: 'center'
        },
        header:{
            backgroundColor: '#116530',
            width: width,
            height: 100,
            marginBottom: 80,
            alignItems: 'center'
        },
        profilePicFrame:{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            height: 160,
            width: 160,
            padding: 3,
            marginTop: 10,
            borderRadius: 80
        },
        profilePic: {
            flex: 1,
            resizeMode: 'contain',
            borderRadius: 80
        },
        profileContainer:{
            flex: 1,
            alignItems: 'center'
        },
        nameFont:{
            color: '#116530',
            fontSize: 20,
            margin: 5
        },
        locationFont:{
            color: '#000',
            fontSize: 18,
            marginBottom: 15
        },
        infoContainer:{
            backgroundColor: '#f6f6f6',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            alignItems: 'flex-start'
        },
        infoRowContainer:{
            flexDirection: 'row',
            marginVertical: 5
        },
        infoBody:{
            paddingLeft: 20,
            maxWidth: 250
        },
        infoTitleFont:{
            color: '#116530'
        },
        infoBodyFont:{
            color: 'black',
            fontStyle: 'italic'
        },
        contributionContainer:{
            width: 250,
            marginTop: 20
        },
        contributionTitleContainer:{
            backgroundColor: '#4EB574',
            borderRadius: 5,
            paddingVertical: 7,
            marginBottom: 15
        },
        contributionTitleFont:{
            color: 'white',
            fontSize: 14,
            textAlign: 'center'
        },
        contributionInfoContainer:{
            backgroundColor: '#f6f6f6',
            borderRadius: 5,
            paddingVertical: 15,
            alignItems: 'center'
        },
        contributionInfoFont: {
            color: '#4EB574',
            fontWeight: 'bold',
            fontSize: 20
        },
        contributionInfoBodyFont:{
            color: 'black',
            fontStyle: 'italic',
            margin: 5
        },
        historyRowContainer:{
            flexDirection: 'row',
            width: width*0.9,
            paddingVertical: 10,
            borderBottomColor: '#bdbdbd',
            borderBottomWidth: 1,
        },
        historyDateContainer:{
            backgroundColor: '#f6f6f6',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50
        },
        historyContainer:{
            width: '65%',
            marginHorizontal: 10
        },
        historyTitleFont:{
            color: 'black',
            fontSize: 18
        },
        historyBodyFont:{
            color: 'black',
            fontSize: 14
        },
        historyPriceFont:{
            color: '#bdbdbd',
            fontSize: 14,
        },
        footer:{
            paddingBottom: 20
        }
      });

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
                        setPassword(user.password);
                        setLocation(user.location);
                        setAddress(user.address);
                        setIsVendor(user.isVendor);
                        setIsLoggedIn(user.isLoggedIn);
                    }
                }
            )
        } catch (error) {
            alert(error);
        }
    }

    const onUpdateData = async() => {
        try{
            user = {
                name: name,
                mobile: mobile,
                password: password,
                location: location,
                address: address
            }
            await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
        } catch (error){
            alert(error);
        }
    }

    const onSignOut = async() => {
        try{
            user = {
                isLoggedIn: false
            }
            await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
        } catch (error){
            alert(error);
        }
        navigation.navigate('Sign In');
    }

    const onDelete = async() => {
        try{
            await AsyncStorage.removeItem('UserData');
            navigation.navigate('Sign In');
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

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
                        <View style={styles.infoBody}>
                            <Text style={styles.infoBodyFont}>{address}</Text>
                        </View>
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Contact Number</Text> 
                        <View style={styles.infoBody}>
                            <Text style={styles.infoBodyFont}>{mobile}</Text>
                        </View>
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Email</Text> 
                        <View style={styles.infoBody}>
                            <Text style={styles.infoBodyFont}>{email}</Text>
                        </View>
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
                    <View style={styles.historyRowContainer}>
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
                    </View>
                    <View style={styles.historyRowContainer}>
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
                    </View>
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

