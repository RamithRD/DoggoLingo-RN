import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Image, FlatList } from 'react-native';
import Axios from 'axios';
import LottieView from 'lottie-react-native';
import DoggoListItem from '../utils/doggoListItem'

const HomeScreen = ({ navigation }) => {

    const [breeds, setBreeds] = useState({});


    const goToDetailScreen = (item) => {
        navigation.navigate('DoggoDetail', {breed: breeds[item]})
    }

    Axios
        .get('https://dog.ceo/api/breeds/list/all')
        .then(({ data }) => {
            const breedsObj = data.message;
            const breedKeys = Object.keys(breedsObj);
            const assembledBreedsObj = {};

            breedKeys.map(key => {
                if(breedsObj[key].length > 0){

                    //breed has sub breeds
                    breedsObj[key].forEach(subBreed => {
                        assembledBreedsObj[key + '_' + subBreed] =  key + ' (' + subBreed + ')';       
                    });

                } else {

                    //no sub breeds, can directly add to list
                    assembledBreedsObj[key] = key;

                }
            })

            setBreeds(assembledBreedsObj);

            //console.log(assembledBreedsObj)


        })

    return (
        <SafeAreaView style={styles.container} >
                <View style={styles.imgContainer}>
                    {/* <Image resizeMode='contain' source={ require('../assets/doggo_lingo.png')} style={styles.imgLogo}/> */}
                    <LottieView source={require('../assets/happy_doggo.json')} autoPlay loop/>
                    
                </View>

                <View style={styles.breedListContainer}>

                <Text style={{color:'white', fontSize: 40, fontFamily: 'BungeeShade-Regular', textAlign: 'center'}}>DOGGO-LINGO</Text>
                    
                    <FlatList 
                        style = {styles.breedList}
                        //converts object to array
                        data = {Object.keys(breeds)}
                        keyExtractor={(item, index) => {
                            return 'doggo' + index;
                        }}
                        renderItem = {({item}) => {
                            return(
                                <DoggoListItem text={breeds[item]}  goToDetailScreen={goToDetailScreen}/>
                            ) 
                        }}
                    />
                    
                </View>
        </SafeAreaView>
    )
};

HomeScreen.navigationOptions = {
    headerShown: false
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b26972'
    },
    imgContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    imgLogo: {
    },
    breedListContainer: {
        flex: 3,
    },
    breedList: {
        flex: 1,
        marginTop: 10
    },

})