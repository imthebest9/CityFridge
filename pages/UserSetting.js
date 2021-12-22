import React, {useState, useEffect} from 'react'
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    TextInput
    } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import ImagePicker from 'react-native-image-crop-picker';

export default function UserProfile({navigation, route}) {
    const {styles, componentWidth} = route.params;
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [password, setPassword] = useState(null);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    var user;
    
    const getData = async() => {
        try{
            await AsyncStorage.getItem('UserData').then(
                value => {
                    if (value != null){
                        user = JSON.parse(value);
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
                        <TextInput style={styles.settingTextInput}
                        defaultValue={name}
                        onChangeText={(input)=>setName(input)}
                        />
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Email</Text>
                        <TextInput style={styles.settingTextInput}
                            defaultValue={email}
                            onChangeText={(input)=>setEmail(input)}
                            />
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Contact Number</Text> 
                        <TextInput style={styles.settingTextInput}
                            defaultValue={mobile}
                            onChangeText={(input)=>setMobile(input)}
                            keyboardType='numeric'
                            />
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Location</Text>
                        <TextInput style={styles.settingTextInput}
                            defaultValue={location}
                            onChangeText={(input)=>setLocation(input)}
                            />
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Address</Text>
                        <TextInput style={styles.settingTextInput}
                            defaultValue={address}
                            onChangeText={(input)=>setAddress(input)}
                            />
                    </View>
                    <View style={styles.infoRowContainer}>
                        <Text style={styles.infoTitleFont}>Password</Text>
                        <TextInput style={styles.settingTextInput}
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