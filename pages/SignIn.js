import React, {useState} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({navigation, route}) => {
    const {styles} = route.params;
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    var user;

    try{
        AsyncStorage.getItem('UserData').then(
            value => {
                if (value != null){
                    user = JSON.parse(value);
                    setUsername(user.username);
                    setPassword(user.password);
                    //navigation.navigate('Profile', {username: username});
                }
            }
        )
    } catch (error) {
        alert(error);
    }

    const onSignIn = async() => {
        if(user != null){
            if(username==user.username && password==user.password){
                try{
                    navigation.navigate('Profile', {username: username});
                } catch (error){
                    alert(error);
                }
            }
            else alert('wrong');
        } else{
            alert('no user');
        }
    }

    return (
        <View style={styles.container}>
            <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode='contain'
            />
            <View style={styles.form}>
                <TextInput style={styles.textInput}
                placeholder='Username'
                onChangeText={(input)=>setUsername(input)}
                />
                <TextInput style={styles.textInput}
                defaultValue=''
                placeholder='Password'
                onChangeText={(input)=>setPassword(input)}
                secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button}
                onPress={onSignIn}>
                    <Text style={styles.buttonText}>
                    Sign In
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
      );
}

export default SignIn;