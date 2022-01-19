import React, {useState} from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput
    } from 'react-native';
import SwitchSelector from '../components/SwitchSelector';
import { styles } from './SignIn'
import { StackActions } from '@react-navigation/native';
import { auth, database } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

export default ({navigation})=>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [isVendor, setIsVendor] = useState(false);

    const onValidatie = () => {
        if(!name)
        alert('Please enter your name')
        else if(isVendor && !description)
        alert('Please add a description for your store')
        else if(!username)
        alert('Please enter your username')
        else if(!username.match(/^[a-zA-Z0-9@_\.]*$/))
        alert('Username must must contain only lowecase letters, numbers, at(@), periods(.), or underscores(_) only.')
        else if(!email)
        alert('Please enter your email address')
        else if(!contact)
        alert('Please enter your mobile number')
        else if(!password)
        alert('Please enter your password')
        else if(!confirmPassword)
        alert('Please confirm your password')
        else if(password!=confirmPassword)
        alert('Password must be same.\nPlease confirm again')
        else if(!location)
        alert('Please enter your location')
        else if(!address)
        alert('Please enter your full address')
        else return true
        return false
    }

    const onSignUp = () => {
        if (onValidatie()) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if(isVendor){
                    setDoc(doc(database, "vendors", user.uid), {
                        name: name,
                        description: description,
                        username: username,
                        contact: contact,
                        email: email,
                        location: location,
                        address: address,
                        isVendor: isVendor,
                        contribution: parseFloat(0),
                        review: parseFloat(5.0)
                      });
                }
                else{
                    setDoc(doc(database, "customers", user.uid), {
                        name: name,
                        username: username,
                        contact: contact,
                        email: email,
                        location: location,
                        address: address,
                        isVendor: isVendor,
                        contribution: parseFloat(5.0)
                      });
                }
                setDoc(doc(database, "history", user.uid), {
                    food: [],
                    contribution: parseFloat(0)
                });
                updateProfile(user, {
                    displayName: username
                  }).then(() => {
                    sendEmailVerification(user)
                    .then(() => {
                        alert("Thank you for signing up for CityFridge.\nPlease verify your email then log in.")
                        navigation.dispatch(
                            StackActions.replace('Sign In')
                        );
                    });
                  }).catch((error) => {
                    alert(error.message);
                  });
            })
            .catch((error) => {
                alert(error.message);
            });
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
                <View style={styles.form}>
                    <TextInput style={styles.textInput}
                    placeholder='Business Name'
                    onChangeText={(input)=>setName(input.trim())}
                    />
                    <TextInput style={styles.textInput}
                    multiline = {true}
                    maxHeight = {80}
                    placeholder='Store Description'
                    onChangeText={(input)=>setDescription(input.trim())}
                    />
                </View>
                ) : (
                <View style={styles.form}>
                    <TextInput style={styles.textInput}
                    placeholder='Name'
                    onChangeText={(input)=>setName(input.trim())}
                    />
                </View>
                )
            }
            <View style={styles.form}>
                <TextInput style={styles.textInput}
                placeholder='Username'
                onChangeText={(input)=>setUsername(input.trim())}
                />
                <TextInput style={styles.textInput}
                placeholder='Email'
                onChangeText={(input)=>setEmail(input.trim())}
                />
                <TextInput style={styles.textInput}
                placeholder='Contact Number'
                onChangeText={(input)=>setContact(input.trim())}
                keyboardType='numeric'
                />
                <TextInput style={styles.textInput}
                placeholder='Password'
                onChangeText={(input)=>setPassword(input)}
                secureTextEntry={true}
                />
                <TextInput style={styles.textInput}
                placeholder='Confirm Password'
                onChangeText={(input)=>setConfirmPassword(input.trim())}
                secureTextEntry={true}
                />
                <TextInput style={styles.textInput}
                placeholder='Location'
                onChangeText={(input)=>setLocation(input.trim())}
                />
                <TextInput style={styles.textInput}
                placeholder='Full Address'
                onChangeText={(input)=>setAddress(input.trim())}
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