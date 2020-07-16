import React, { PureComponent} from 'react';
import { StyleSheet, TouchableOpacity, Text  } from 'react-native';
import {Card} from 'react-native-elements';

export default class DoggoListItem extends PureComponent {
  


  render(){

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const breedTitle = capitalizeFirstLetter(this.props.text);

    return (
        <Card style={styles.card}>
        <TouchableOpacity style={styles.breedItem} onPress={ () => { this.props.goToDetailScreen(this.props.text) } } >
            <Text style={styles.breedItemText}>{breedTitle}</Text>
        </TouchableOpacity>
        </Card>
    )

  }


}

const styles = StyleSheet.create({
    breedItem: {
        flex: 1,
        padding: 10
    },
    breedItemText: {
        fontSize: 24,
        fontWeight: '500'
    },
    card: {
        backgroundColor: '#ddd',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
      },
})