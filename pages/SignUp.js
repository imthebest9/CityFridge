import React, {useState} from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput
    } from 'react-native';
import SwitchSelector from '../components/SwitchSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({navigation, route}) {
    const {styles, componentWidth} = route.params;
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [password, setPassword] = useState(null);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [isVendor, setIsVendor] = useState(false);

    const onSignUp = async() => {
        if(username.length==0 || password.length==0){
            alert('You idiot!');
        } else{
            try{
                var user = {
                    name: name,
                    username: username,
                    email: email,
                    mobile: mobile,
                    password: password,
                    location: location,
                    address: address,
                    isVendor: isVendor,
                    isLoggedIn: true
                }
                await AsyncStorage.setItem('UserData', JSON.stringify(user));
                navigation.navigate('Profile');
            } catch (error){
                alert(error);
            }
        }
    }

    return (
    <View style={styles.container}>
        <View style={{margin:10}}>
            <SwitchSelector
                selectionOption={1}
                optionLeft={'Customer'}
                optionRight={'Vendor'}
                onSelectSwitch={option=>{
                    setIsVendor(option==1 ? false : true);
                }}/>
        </View>
        <ScrollView contentContainerStyle={{alignItems:'center'}}>
            {isVendor ? (
                <View style={{alignItems:'center', width: componentWidth}}>
                    <TextInput style={styles.textInput}
                    placeholder='Business Name'
                    onChangeText={(input)=>setName(input)}
                    />
                </View>
                ) : (
                <View style={{alignItems:'center', width: componentWidth}}>
                    <TextInput style={styles.textInput}
                    placeholder='Name'
                    onChangeText={(input)=>setName(input)}
                    />
                </View>
                )
            }
            <View style={styles.form}>
                <TextInput style={styles.textInput}
                placeholder='Username'
                onChangeText={(input)=>setUsername(input)}
                />
                <TextInput style={styles.textInput}
                placeholder='Email'
                onChangeText={(input)=>setEmail(input)}
                />
                <TextInput style={styles.textInput}
                placeholder='Mobile Number'
                onChangeText={(input)=>setMobile(input)}
                keyboardType='numeric'
                />
                <TextInput style={styles.textInput}
                placeholder='Password'
                onChangeText={(input)=>setPassword(input)}
                secureTextEntry={true}
                />
                <TextInput style={styles.textInput}
                placeholder='Location'
                onChangeText={(input)=>setLocation(input)}
                />
                <TextInput style={styles.textInput}
                placeholder='Full Address'
                onChangeText={(input)=>setAddress(input)}
                />
            </View>
            <TouchableOpacity style={styles.button}
                onPress={onSignUp}>
                <Text style={styles.buttonText}>
                Sign Up
                </Text>
            </TouchableOpacity>
        </ScrollView>
    </View>
    )
}
