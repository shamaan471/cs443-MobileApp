import React, {useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import Card from '../components/UI/Card';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Input, CheckBox, Button, Overlay} from 'react-native-elements';
import * as authActions from '../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';




const HomeScreen = props => {

    const [enteredLongUrl, setEnteredLongUrl] = useState('');
    const [customUrlChecked, setCostumUrlChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [customUrl, setCustomUrl] = useState('');
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [overlayMessage, setOverlayMessage] = useState('');
    const userId = useSelector(state => state.auth.userId);

    const dispatch = useDispatch();


    const generateShortUrlHandler = async (text, isCostumUrl, myCustomUrl) => {

        if(myCustomUrl.length <= 0 && isCostumUrl){
            setOverlayMessage("Please enter a Costum Url");
            setOverlayVisible(true);
        }
        else if(myCustomUrl.length > 10 && isCostumUrl){
            setOverlayMessage("The url cannot be more than 10 characters long!");
            setOverlayVisible(true);
        }

        else{
            setIsLoading(true);
            //send api request to genetate the long url
            let response;
            if(isCostumUrl){
                response = await fetch(
                    'https://teenyurl21.herokuapp.com/api/Url/Custom',
                    {
                        method: 'Post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userID: userId,
                            longURL: text,
                            shortURL: myCustomUrl
                        })
                    }
                );
            }
            else{
                response = await fetch(
                    'https://teenyurl21.herokuapp.com/api/Url',
                    {
                        method: 'Post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userID: userId,
                            longURL: text
                        })
                    }
                );
            }
        
            if (!response.ok) {
                const errorResData = await response.json();
                const errorId = errorResData.error.message;
                let message = 'Something went wrong!';
                setIsLoading(false);
            }
            const resData = await response.json();
            console.log(resData);
            setIsLoading(false);
        }
    }

    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    return(
        <View style={styles.screen}>
            <View>
                <Overlay isVisible={overlayVisible} onBackdropPress={() => {setOverlayVisible(false)}}>
                    <Text>{overlayMessage}</Text>
                </Overlay>
            </View>
            <Card style = {styles.cardContainer}>
                <View style={styles.imageContainer}>
                    <Image
                    style={styles.tinyLogo}
                    source={
                        require('../assets/teeny.png')
                    }
                />
            </View>
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
                    autoCapitalize={'none'}       
                    />) 
                    : (null)
                }
                {isLoading?
                    (
                        <ActivityIndicator/>
                    )
                    :
                    (
                        <Button
                            title="Generate Short URL"
                            style={styles.buttons}
                            type="outline"
                            onPress = {() => {generateShortUrlHandler(enteredLongUrl, customUrlChecked, customUrl)}}
                        />
                    )
                }
                <Button 
                    title = "Logout"
                    style={styles.buttons}
                    type="outline"
                    onPress={logoutHandler}
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
    imageContainer:{
        paddingVertical: 20,
        alignItems: 'center'
    },
    tinyLogo:{
        height: 80,
        width: 185
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
    buttons: {
        width: 80,
        paddingVertical: 5
    }
});    

export const screenOptions = {
    headerTitle: 'Home'
};
  

export default HomeScreen;