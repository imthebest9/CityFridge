import React from 'react'
import { View, Text, Image } from 'react-native'

export default function Stores() {
    return (
        <View>
            <Text>Store Image</Text>
            <StoreImage/>
            <Text>Store name and Store Description</Text>
            <Text>Pricing</Text>
        </View>
    )
}

const StoreImage = () => (
    <Image 
        source = {{
                uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-l-yvaJeShKk%2FUwnCeeBu6gI%2FAAAAAAAAHO4%2Fd1ZVMa1gOmQ%2Fs1600%2FPhoto%2B1.JPG&f=1&nofb=1",
        }} 
        style= {{width: 120, height: 120 }}
    />
)

