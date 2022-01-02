import React, {useState} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = ({navigation, route}) => {
    const {styles} = route.params;
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);    

    onAuthStateChanged(auth, (user) => {
        if (user && user.emailVerified) {
            navigation.dispatch(
                StackActions.replace('Profile', {
                    username: user.displayName,
                })
            );
        }
    });

    const onSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if(user.emailVerified)
            navigation.dispatch(
                StackActions.replace('Profile', {
                    username: user.displayName
                })
            );
            else{
                alert("Please verify your email")
            }
        })
        .catch((error) => {
            alert(error.message);
        });
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
                placeholder='Email'
                onChangeText={(input)=>setEmail(input)}
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