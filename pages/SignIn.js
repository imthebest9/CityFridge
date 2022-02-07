import React, {useState, useEffect} from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    Keyboard
    } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { auth, database, storage } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { getDownloadURL, ref } from 'firebase/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default ({navigation}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [image, setImage] = useState(null)

    useEffect(async()=>{
        setImage(await getDownloadURL(ref(storage, "logo.jpeg")))
        auth.onAuthStateChanged((user)=>{
            if(user && user.emailVerified){
                storeProfile(user.uid)
            }
        })
    }, [image==null])

    const onSignIn = () => {
        Keyboard.dismiss()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if(user.emailVerified){
                storeProfile(user.uid)
            }
            else{
                alert("Please verify your email")
            }
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    const storeProfile = (id) => {
        getDoc(doc(database, "customers", id)).then((docSnap)=>{
            if(docSnap.exists()){
                AsyncStorage.setItem("profile", "customers")
            }
            else{
                AsyncStorage.setItem("profile", "vendors")
            }
        });
        navigation.dispatch(
            StackActions.replace('Profile')
        );
    }

    return (
        <View style={styles.container}>
            <Image
            source={{uri: image}}
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

const width = Dimensions.get("screen").width;
const componentWidth = width * 0.8;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    flex: 1,
    alignItems: "center",
    width: componentWidth,
  },
  textInput: {
    backgroundColor: "#f6f6f6",
    borderRadius: 5,
    padding: 10,
    margin: 7,
    width: "100%",
    color: "#000",
    fontSize: 16,
    fontFamily: "MerriweatherSans_400Regular"
  },
  button: {
    backgroundColor: "#4EB574",
    borderRadius: 50,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Merriweather_400Regular"
  },
  logo: {
    margin: 20,
    height: width * 0.3,
    width: width * 0.3
  }
});