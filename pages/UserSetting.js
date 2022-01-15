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
//import ImagePicker from 'react-native-image-crop-picker';
import { auth, database } from "../firebase";
import { updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider  } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 

export default function UserProfile({navigation, route}) {
    const {styles, componentWidth} = route.params
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [selectedOption, setSelectedOption] = useState(1)
    const user = auth.currentUser

    const onValidatieProfile = () => {
        if(!name)
        alert('Please enter your name')
        else if(!mobile)
        alert('Please enter your mobile number')
        else if(!location)
        alert('Please enter your location')
        else if(!address)
        alert('Please enter your full address')
        else return true
        return false
    }

    const onUpdateProfile = () => {
        if(onValidatieProfile()){
            setDoc(doc(database, "users", user.uid), {
                name: name,
                mobile: mobile,
                location: location,
                address: address
              }, { merge: true });
        }
        alert('Saved!')
    }

    const onUpdateAccount = () => {
        if(!password && !newPassword && !confirmPassword){
            if(email!=user.email){
                updateEmail(user, email).then(()=>{
                    setDoc(doc(database, "users", user.uid), {
                    email: email
                    }, { merge: true });
                    alert('Email updated')
                }).catch((error)=>{
                    alert(error.message)
                })
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
                                setDoc(doc(database, "users", user.uid), {
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

    useEffect(() => {
        getDoc(doc(database, "users", user.uid)).then((docSnap)=>{
            const data = docSnap.data()
            setName(data['name'])
            setMobile(data['mobile'])
            setLocation(data['location'])
            setAddress(data['address'])
            setEmail(user.email)
        });
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
            <SwitchSelector
                selectionOption={1}
                optionLeft={'Profile'}
                optionRight={'Account'}
                onSelectSwitch={option=>{
                    setSelectedOption(option)
                }}/>
            <ScrollView contentContainerStyle={{width: componentWidth}}>
                {
                    (selectedOption==1) ? (
                    <View style={styles.infoContainer}>
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Name</Text>
                            <TextInput style={styles.settingTextInput}
                            defaultValue={name}
                            onChangeText={(input)=>setName(input.trim())}
                            />
                        </View>
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Contact Number</Text> 
                            <TextInput style={styles.settingTextInput}
                                defaultValue={mobile}
                                onChangeText={(input)=>setMobile(input.trim())}
                                keyboardType='numeric'
                                />
                        </View>
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Location</Text>
                            <TextInput style={styles.settingTextInput}
                                defaultValue={location}
                                onChangeText={(input)=>setLocation(input.trim())}
                                />
                        </View>
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Address</Text>
                            <TextInput style={styles.settingTextInput}
                                defaultValue={address}
                                onChangeText={(input)=>setAddress(input.trim())}
                                />
                        </View>
                    </View>
                    ) : (
                    <View style={styles.infoContainer}>
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Email</Text>
                            <TextInput style={styles.settingTextInput}
                                defaultValue={email}
                                onChangeText={(input)=>setEmail(input.trim())}
                                />
                        </View>
                        <View style={styles.infoRowContainer}>
                            <Text style={styles.infoTitleFont}>Password</Text>
                            <TextInput style={styles.settingTextInput}
                                placeholder='Password'
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
                    </View>
                    )
                }
                <TouchableOpacity style={styles.button}
                    onPress={()=>{
                        if(selectedOption==1)
                        onUpdateProfile()
                        else
                        onUpdateAccount()
                    }
                    }>
                    <Text style={styles.buttonText}>
                    Save
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}