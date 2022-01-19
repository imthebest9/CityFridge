import React, {useState, useEffect} from 'react'
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    TextInput
    } from 'react-native'
    import SwitchSelector from '../components/SwitchSelector';
import * as ImagePicker from 'expo-image-picker';

import { styles } from './UserProfile'
import { auth, database, storage } from "../firebase";
import { updateEmail, updatePassword, reauthenticateWithCredential , EmailAuthProvider  } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

export default ()=>{
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [selectedOption, setSelectedOption] = useState(1)
    const [user, setUser] = useState()
    const [profile, setProfile] = useState('')
    const [isVendor, setIsVendor] = useState(false)
    const [image, setImage] = useState(null)
    const [imageRef, setImageRef] = useState(null)

    useEffect(()=>{
        auth.onAuthStateChanged((currentUser)=>{
            setUser(currentUser)
            AsyncStorage.getItem('profile').then(profile=>{
                if(profile=="vendors")
                setIsVendor(true)
                setProfile(profile)
                getDoc(doc(database, profile, user.uid)).then((snapshot)=>{
                    setData(snapshot.data())
                    const url = snapshot.data().image_url
                    if(url==null){
                        getDownloadURL(ref(storage, "logo.jpeg")).then((url)=>{
                            setImage(url)
                        })
                    }
                    else
                    setImage(url)
                })
            })
            setImageRef(ref(storage, currentUser.uid+"/profile.jpeg"))
        })
    }, [profile==''])

    const onValidatieProfile = () => {
        if(!name)
        alert('Please enter your name')
        else if(!location)
        alert('Please enter your location')
        else if(!contact)
        alert('Please enter your mobile number')
        else if(isVendor && !description)
        alert('Please add a description for your store')
        else if(!address)
        alert('Please enter your full address')
        else return true
        return false
    }

    const onUpdateProfile = () => {
        if(onValidatieProfile()){
            setDoc(doc(database, profile, user.uid), isVendor?
            {
                name: name,
                contact: contact,
                location: location,
                address: address,
                description: description
            } :{
                name: name,
                contact: contact,
                location: location,
                address: address
            }, { merge: true });
        }
        alert('Saved!')
    }

    const onUpdateAccount = () => {
        if(email!=user.email && !password){
            alert("Please enter your current password to update your email")
        }
        else if(!newPassword && !confirmPassword && password){
            if(!email){
                alert("Please enter your new email to update your email")
            }
            else if(email!=user.email){
                const credential = EmailAuthProvider.credential(
                    user.email, 
                    password
                );
                reauthenticateWithCredential(user, credential).then(() => {
                    updateEmail(user, email).then(()=>{
                    setDoc(doc(database, profile, user.uid), {
                    email: email
                    }, { merge: true });
                    alert('Email updated')
                    }).catch((error)=>{
                        alert(error.message)
                    })
                }).catch(error=>alert(error.message))
            }
        }
        else{
            if(!password)
            alert('Please enter your current password before changing a new password')
            else if(!newPassword)
            alert('Please enter your new password')
            else if(!confirmPassword)
            alert('Please confirm your password')
            else if(password==newPassword)
            alert('Please enter a different new password')
            else if(newPassword!=confirmPassword)
            alert('Password must be same.\nPlease confirm again')
            else{
                const credential = EmailAuthProvider.credential(
                    user.email, 
                    password
                );
                reauthenticateWithCredential(user, credential).then(() => {
                    alert('done')
                    updatePassword(user, password).then(()=>{
                        if(email!=user.email){
                            updateEmail(user, email).then(()=>{
                                setDoc(doc(database, profile, user.uid), {
                                email: email
                                }, { merge: true });
                                alert('Email updated')
                            }).catch((error)=>{
                                alert(error.message)
                            })
                        }
                        else alert('Password updated')
                    }).catch((error)=>{
                        alert(error.message)
                    })
                  }).catch((error) => {
                    alert(error.message)
                  });
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            </View>
            <TouchableOpacity style={styles.profilePicFrame}
                onPress={
                    async()=>{
                        let result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [1, 1],
                            quality: 1,
                          });
                      
                          if (!result.cancelled) {
                            const response = await fetch(result.uri)
                            const blob = await response.blob();
                            uploadBytes(imageRef, blob).then(async()=>{
                                setDoc(doc(database, profile, user.uid), {
                                    image_url: await getDownloadURL(imageRef)
                                }, { merge: true });
                                setImage(result.uri)})
                            .catch(error=>alert(error.message))
                          }
                    }
                }
                >
                    {<Image
                    style={styles.profilePic}
                    source={{uri: image }}
                    />}
                </TouchableOpacity>
            <SwitchSelector
                selectionOption={1}
                optionLeft={'Profile'}
                optionRight={'Account'}
                onSelectSwitch={option=>{
                    setSelectedOption(option)
                }}/>
            <ScrollView contentContainerStyle={styles.form}>
                {
                    (selectedOption==1) ? (
                    <ScrollView contentContainerStyle={styles.infoContainer}>
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Name</Text>
                            <TextInput style={styles.settingTextInput}
                            defaultValue={data["name"]}
                            onChangeText={(input)=>setName(input.trim())}
                            />
                        </View>
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Location</Text>
                            <TextInput style={styles.settingTextInput}
                                defaultValue={data["location"]}
                                onChangeText={(input)=>setLocation(input.trim())}
                                />
                        </View>
                        {data['isVendor'] && <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Description</Text>
                            <TextInput style={styles.settingTextInput}
                            multiline = {true}
                            maxHeight = {80}
                            defaultValue={data["description"]}
                            onChangeText={(input)=>setDescription(input.trim())}
                            />
                        </View>}
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Contact Number</Text> 
                            <TextInput style={styles.settingTextInput}
                                defaultValue={data["contact"]}
                                onChangeText={(input)=>setContact(input.trim())}
                                keyboardType='numeric'
                                />
                        </View>
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Address</Text>
                            <TextInput style={styles.settingTextInput}
                                defaultValue={data["address"]}
                                onChangeText={(input)=>setAddress(input.trim())}
                                />
                        </View>
                        <TouchableOpacity style={styles.button}
                        onPress={onUpdateProfile}>
                    <Text style={styles.buttonText}>
                    Save
                    </Text>
                </TouchableOpacity>
                    </ScrollView>
                    ) : (
                    <View style={styles.infoContainer}>
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Email</Text>
                            <TextInput style={styles.settingTextInput}
                                defaultValue={data["email"]}
                                onChangeText={(input)=>setEmail(input.trim())}
                                />
                        </View>
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Password</Text>
                            <TextInput style={styles.settingTextInput}
                                placeholder='Current Password'
                                onChangeText={(input)=>setPassword(input)}
                                secureTextEntry={true}
                                />
                        </View>
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>New Password</Text>
                            <TextInput style={styles.settingTextInput}
                                placeholder='New Password'
                                onChangeText={(input)=>setNewPassword(input)}
                                secureTextEntry={true}
                                />
                        </View>
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Confirm</Text>
                            <TextInput style={styles.settingTextInput}
                                placeholder='Confirm Password'
                                onChangeText={(input)=>setConfirmPassword(input)}
                                secureTextEntry={true}
                                />
                        </View>
                        <TouchableOpacity style={styles.button}
                            onPress={onUpdateAccount}>
                            <Text style={styles.buttonText}>
                            Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                    )
                }
            </ScrollView>
        </View>
    )
}