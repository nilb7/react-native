import React from "react";
import{
    View,
    Text,
    StyleSheet,
    Image
}from "react-native";

const Item = ({item}) => {
    return(
        <View style={styles.cardContainer}>
            <Image source={{uri:item.image}}
            style={styles.img}>

                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.category}>{item.category}</Text>
                    <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
                    <Text style={styles.price}>${item.price}</Text>

                </View>

            </Image>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        boderRadius: 8,
        marginBottom: 18,
        padding: 8
    },
    img:{
        width: 100,
        height: 100,
        borderRadius: 8

    },
    textContainer:{
        paddingHorizontal:10,
        flex:1,
    },
    name:{
        fontSize: 18,
        fontWeight: "bold"
    },
    category:{
        color:"#2bbdff"
    },
    desc:{
        fontSize: 12,
        marginVertical: 5,
    },
    price:{
        backgroundColor: "#2bbdff",
        color: "#fff",
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        borderRadius: 12
    }
})

export default Item;