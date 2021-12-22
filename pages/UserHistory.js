import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

export default function UserHistory({route}) {
    const {styles} = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.insightTimeAndDateContainer}>
                <View style={styles.insightDateContainer}>
                    <Text style={styles.insightDateFont}>
                        November 23
                    </Text>
                </View>
                <View style={styles.insightDayAndTimeContainer}>
                    <View style={styles.insightDayContainer}>
                        <Text style={styles.insightDayAndTimeFont}>
                            Saturday
                        </Text>
                    </View>
                    <View style={styles.insightTimeContainer}>
                        <Text style={styles.insightDayAndTimeFont}>
                            3:00 PM
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.insightContainer}>
                <Text style={styles.insightStoreFont}>
                    Uncle Roger Restaurant
                </Text>
                <View style={styles.insightRowContainer}>
                    <View style={styles.insightLargeColumnContainer}>
                        <Text style={styles.insightTitleFont}>
                            Items
                        </Text>
                    </View>
                    <View style={styles.insightSmallColumnContainer}>
                        <Text style={styles.insightTitleFont}>
                            Weight
                        </Text>
                    </View>
                    <View style={styles.insightSmallColumnContainer}>
                        <Text style={styles.insightTitleFont}>
                            Price
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.insightRowContainer}>
                        <View style={styles.insightLargeColumnContainer}>
                            <View style={styles.itemBullet}>
                            </View>
                            <Text style={styles.historyBodyFont}>
                                Items
                            </Text>
                        </View>
                        <View style={styles.insightSmallColumnContainer}>
                            <Text style={styles.historyBodyFont}>
                                Weight
                            </Text>
                        </View>
                        <View style={styles.insightSmallColumnContainer}>
                            <Text style={styles.historyBodyFont}>
                                Price
                            </Text>
                        </View>
                    </View>
                    <View style={styles.insightRowContainer}>
                        <View style={styles.insightLargeColumnContainer}>
                            <View style={styles.itemBullet}>
                            </View>
                            <Text style={styles.historyBodyFont}>
                                Items
                            </Text>
                        </View>
                        <View style={styles.insightSmallColumnContainer}>
                            <Text style={styles.historyBodyFont}>
                                Weight
                            </Text>
                        </View>
                        <View style={styles.insightSmallColumnContainer}>
                            <Text style={styles.historyBodyFont}>
                                Price
                            </Text>
                        </View>
                    </View>
                    <View style={styles.insightFooter}>
                        <View style={styles.insightRowContainer}>
                            <View style={styles.insightLargeColumnContainer}>
                                <Text style={styles.insightTitleFont}>
                                    TOTAL
                                </Text>
                            </View>
                            <View style={styles.insightSmallColumnContainer}>
                                <Text style={styles.insightTitleFont}>
                                    kg
                                </Text>
                            </View>
                            <View style={styles.insightSmallColumnContainer}>
                                <Text style={styles.insightTitleFont}>
                                    RM
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}