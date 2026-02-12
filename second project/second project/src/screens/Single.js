import React from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";

const Single = ({ route, navigation }) => {
    const { item } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                    >

                </Image>
            </View>

            <View style={styles.cardHolder}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>

            <Text style={styles.description}>{item.description}</Text>

            <TouchableOpacity 
            style={styles.btn} 
            onPress={() => navigation.goBack()}>
                <Text style={styles.btnText}>Go Back</Text>
            </TouchableOpacity>0

        </ScrollView>
    )
};

export default Single;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f2f2f2",
        flexGrow: 1
    },
    imageContainer: {
        borderRadius: 20,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 300
    },
    cardHolder: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2c2c54"
    },
    description: {
        marginTop: 15,
        fontSize: 16,
        color: "#555"
    },
    btn: {
        marginTop: 30,
        backgroundColor: "#2c2c54",
        padding: 15,
        borderRadius: 10,
        alignItems: "center"
    },
    btnText: {
        color: "white",
        fontWeight: "bold"
    }

});
