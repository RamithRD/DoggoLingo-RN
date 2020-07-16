import React from 'react';
import { Text } from 'react-native';

const PlainText = ({ text }) => {
    
    if(!text) {
        return null; 
    }

    //strip down html tags from a string
    const plainText = text.replace(/<[^>]*>?/gm, '').replace(/\&quot\;/gm, "'");

    return <Text>{plainText}</Text>;
}

export default PlainText;