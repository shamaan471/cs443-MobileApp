import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Card from '../components/UI/Card';



const UrlListScreen = props => {
    const [urlList, setUrlList] = useState([]);


    return (
        <View style={styles.screen}>
            <Text>{"This is the url list screen duh!"}</Text>
        </View>
    );

}


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
    headerTitle: 'My Urls'
};
  

export default UrlListScreen;