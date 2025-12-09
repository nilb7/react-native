import react from "react";
import { View, StyleSheet, Text } from "react-native"





const BoxScreen =()=>{
    return(
      
        <View style={styles.container}>
            <Text style={styles.title}> flex direction: "row" </Text>

            <View style={styles.boxArea}>
                <View style={[styles.box,{backgroundColor:"powerblue"}]}>1</View>
                <View style={[styles.box,{backgroundColor:"skyblue"}]}>2</View>
                <View style={[styles.box,{backgroundColor:"darkblue"}]}>3</View>

            </View>


        </View>
    )
        
};
const styles =StyleSheet.create({
    container:{
        flex:1,
        paddingTop:40,
        alingnItems:"center",
        backgroundColor:"#fff",
        },


        title: {
          fontSize:20,
          marginBottom:12,
        },
        boxArea:{
            width:"95%",


            backgroundColor:"#fff",
            justifyContent:"flex-start", // center // space-between // space-around // space-evenly // flex-end
            paddingHorizontal:10,
            flexDirection:"column",// row //reverse
            alignItems:"stretch",
        },
        box:{
            width:50,
            height:50,
        }


    
})



export  default BoxScreen