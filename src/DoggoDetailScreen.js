import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Axios from 'axios';
import {Card} from 'react-native-elements';

const DoggoDetailScreen = ({ navigation }) => {

    //retrieves the width and height of the device currently running on
    const { width, height } = Dimensions.get('window');

    const [images, setImages] = useState([]);    
    const [desc, setDesc] = useState();
    const breed = navigation.getParam('breed');

    //hook that is similar to componenDidMount
    useEffect(() => {

        console.log(breed);
        
        Axios
            .get(`https://dog.ceo/api/breed/${breed}/images`)
            .then(({data}) => {
                setImages(data.message);
            });

        Axios
            .get(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${breed}_dog`,
            )
            .then(({data}) => {
              console.log(data)
              setDesc(data.extract);
            })
            .catch((error) => {
               setDesc('Description unavaialble for this good boy');
            });           

    }, [])


    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <FlatList
                    data={images} 
                    keyExtractor={(item, index) => {
                        return 'image' + index;
                    }}
                    snapToInterval={width}
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    renderItem={({item}) => {
                        return(
                            <View style={{margin: 10}}>
                                <Image source={{uri: item}} 
                                style={{width: width - 20, height: height * 0.3}} />
                            </View>
                        )
                    }}

                />
            </View>
            <View style={{flex: 2,}}>
                <Card>
                    <Text style={{fontSize: 20,}}>{desc}</Text>
                </Card>
            </View>
        </View>
    );
};

DoggoDetailScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('breed'),
    headerStyle:{
        backgroundColor:'#b26972',

    },
    headerTitleStyle: {
        color: 'white',
    },
    headerTintColor: 'white'  
});

export default DoggoDetailScreen;

const styles = StyleSheet.create({
})