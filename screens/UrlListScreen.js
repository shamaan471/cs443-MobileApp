import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, ActivityIndicator, Linking, ScrollView} from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import { Text, ListItem, Button, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'; 


const UrlListScreen = props => {
    const [urlList, setUrlList] = useState([]);
    //const [noUrl, setNoUrl] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(state => state.auth.userId);


    const fetchUrls = useCallback(async () => {
        setIsLoading(true);
        const response = await fetch(`https://teenyurl21.herokuapp.com/api/Url/${userId}`);
            
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            console.log(message);
            console.log(errorId);
            setIsLoading(false);
        }
        const resData = await response.json();
        console.log(resData);
        const myArr = []
        for(const key in resData){
            myArr.push({
                short: resData[key].shortURL,
                long: resData[key].longURL
            });
        }
        setIsLoading(false);
        setUrlList(myArr);
    }, [setIsLoading, setUrlList]);

    useEffect(() => {
        console.log("getting urls");
        fetchUrls();
    }, [fetchUrls]);

    return (
        <View style={styles.screen}>
            <View style={styles.headerContainer}>
                <Text h4>{"Your Short Urls:"}</Text>
                <Button
                    icon={
                        <Ionicons name="refresh-circle-outline" size={24} color="black" />
                    }
                    type="clear"
                    onPress={fetchUrls}
                />
            </View>
            {isLoading?
                (
                    <ActivityIndicator/>
                )
                :
                (
                    <ScrollView>
                    {
                      urlList.map((l, i) => (
                        <ListItem
                            style = {styles.listView} 
                            key={i} bottomDivider
                        //  onPress = {() => Clipboard.setString(l.short)}
                            onPress={ ()=>{ Linking.openURL(`https://teenyurl21.herokuapp.com/${l.short}`)}}
                         >
                          <Avatar source={{uri: "https://www.pngarts.com/files/3/URL-Chain-Link-PNG-Picture.png"}} />
                          <ListItem.Content>
                              {console.log(l.short)}
                            <ListItem.Title>{l.short}</ListItem.Title>
                            <ListItem.Subtitle>{l.long}</ListItem.Subtitle>
                          </ListItem.Content>
                        </ListItem>
                      ))
                    }
                  </ScrollView>
                )
            }
        </View>
    );

}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'skyblue'
    },
    listView: {
        paddingVertical: 10,
        backgroundColor: '#fcd7fc'
    },
    headerContainer: {
        marginTop: 35
    }
});   


export const screenOptions = {
    headerTitle: 'My Urls'
};
  

export default UrlListScreen;