import React from "react";
import { View } from "react-native";

const Bird = (birdBottom) => {
    return(
        <View
        style={{
            width: 50,
            height: 50,
            backgroundColor: "blue",
            left: 100,
            bottom: birdBottom
        }}>
            
        </View>
    )
}
export default Bird;