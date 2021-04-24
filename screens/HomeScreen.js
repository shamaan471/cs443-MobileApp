import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Card from '../components/UI/Card';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Input, CheckBox, Button } from 'react-native-elements';




const HomeScreen = props => {

    const [enteredLongUrl, setEnteredLongUrl] = useState('');
    const [customUrlChecked, setCostumUrlChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [customUrl, setCustomUrl] = useState('');



    const generateShortUrlHandler = text => {
        console.log(`long url : ${text}`);
        //send api request to genetate the long url
    }

    return(
        <View style={styles.screen}>
            <Card style = {styles.cardContainer}>
                <Input
                    placeholder='ENTER LONG URL'
                    leftIcon={<AntDesign name="sharealt" size={24} color="black" />}
                    value={enteredLongUrl}
                    onChangeText={setEnteredLongUrl}       
                />
                <CheckBox
                    center
                    title='Generate Custom URL?'
                    checked={customUrlChecked}
                    onPress={() => {setCostumUrlChecked(!customUrlChecked)}}
                />
                {customUrlChecked ? ( <Input
                    placeholder='ENTER YOUR CUSTOM URL'
                    leftIcon={<AntDesign name="isv" size={24} color="black" />}
                    value={customUrl}
                    onChangeText={setCustomUrl}       
                    />) 
                    : (null)
                }
                <Button
                    title="Generate Short URL"
                    type="outline"
                    onPress = {() => {generateShortUrlHandler(enteredLongUrl)}}
                />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue'
    },
    cardContainer: {
        width: '80%',
        height: '80%',
        maxWidth: 400,
        maxHeight: 800,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
        
    },
});    

export const screenOptions = {
    headerTitle: 'Home'
};
  

export default HomeScreen;