import react from "react";
import { View , Text, StyleSheet} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const Icon =(props)=> {
    return(
        <View>
            <View>
                <MaterialCommunityIcons
                name={props.name} size={27} color="#00bcd4">


                </MaterialCommunityIcons>

            </View>
            <Text style={styles.iconText}>
            {props.iconText}</Text>
        </View>
    )

};

const styles = StyleSheet.create({
    iconWrapper: {
    backgroundColor: '#2c3e50',
    width:"100%",
    height:"100%",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,

    },
    iconContainer:{
        alignItems: 'center',
        width:60,
        height:60,
    },
    iconContainer:{
        height: 20,
       fontWeight:"600",
         color:"#333"

    }
});

export default Icon;