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
//import ImagePicker from 'react-native-image-crop-picker';

export default function UserProfile({navigation}) {
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [password, setPassword] = useState(null);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
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
          backgroundColor: 'white',
          borderRadius: 5,
          padding: 7,
          width: '100%',
          color: '#000',
          fontSize: 16,
          flexShrink: 1
        },
        button:{
          backgroundColor: '#4EB574',
          borderRadius: 50,
          padding: 10,
          marginVertical: 10,
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
            height: 80,
            marginBottom: 90,
            alignItems: 'center'
        },
        profilePicFrame:{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            height: 150,
            width: 150,
            marginTop: 10,
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 80,
            overflow: 'hidden'
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
            marginVertical: 5,
            alignItems: 'center'
        },
        infoTitleFont:{
            color: '#116530',
            paddingRight: 10
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
            paddingBottom: 10
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
                email: email,
                mobile: mobile,
                location: location,
                address: address,
                password: password,
            }
            await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
        } catch (error){
            alert(error);
        }
        alert('Saved!');
    }
    const onDelete = async() => {
        try{
            await AsyncStorage.clear();
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
                <TouchableOpacity style={styles.profilePicFrame}
                /*onPress={()=>{
                    ImagePicker.openPicker({
                        width: 300,
                        height: 400,
                        cropping: true
                      }).then(image => {
                        console.log(image);
                      });
                }}*/
                >
                    <Image
                    source={require('../assets/logo.png')}
                    style={styles.profilePic}
                    resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{width: componentWidth}}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Name</Text>
                        <TextInput style={styles.textInput}
                        defaultValue={name}
                        onChangeText={(input)=>setName(input)}
                        />
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Email</Text>
                        <TextInput style={styles.textInput}
                            defaultValue={email}
                            onChangeText={(input)=>setEmail(input)}
                            />
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Contact Number</Text> 
                        <TextInput style={styles.textInput}
                            defaultValue={mobile}
                            onChangeText={(input)=>setMobile(input)}
                            keyboardType='numeric'
                            />
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Location</Text>
                        <TextInput style={styles.textInput}
                            defaultValue={location}
                            onChangeText={(input)=>setLocation(input)}
                            />
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Address</Text>
                        <TextInput style={styles.textInput}
                            defaultValue={address}
                            onChangeText={(input)=>setAddress(input)}
                            />
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Password</Text>
                        <TextInput style={styles.textInput}
                            defaultValue={password}
                            onChangeText={(input)=>setPassword(input)}
                            secureTextEntry={true}
                            />
                    </View>
                </View>
                <TouchableOpacity style={styles.button}
                onPress={onUpdateData}>
                    <Text style={styles.buttonText}>
                    Save
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}