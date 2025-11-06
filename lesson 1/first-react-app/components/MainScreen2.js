import React from "react";
import {Text, StyleSheet, View} from 'react-native'
  
const MainScreen2 = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.textStyle}>This is the Main Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({

    container={
        flex:1,
        backgroundColor:'#9c2d2dff',
        alignItems:'center',
    }

    textStyle:{
        fontSize:20,
        
    }

});

export default MainScreen2;
