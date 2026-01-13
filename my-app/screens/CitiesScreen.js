import react from "react";

import {StyleSheet, View, Text, FlatList} from "react-native";
import data from "../data/cities.json";


class CitiesScreen extends Comment {
    constructor(props) {
        super(props);
        this.state = {
            cities: []
        };
    }

    componentDidMount() {
        this.setState({cities: data})
    }
    renderItem = ({item}) => {
        const{name,countryCode,population,description} = item;
        return(
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>{name}</Text>
                 <Text style={styles.subtitle}>Country Code:{countryCode}</Text>
                 <Text style={styles.description}>{description}</Text>
                 <Text style={styles.small}>{name}</Text>
            </View>
        );
    };


    render() {
        return (
            <View>
                <Text style={styles.screenTitle}>Cities List</Text>
                <FlatList
                    data={this.state.cities}
                    keyExtractor={(item,index)=>
                        item.id ? item.id.toString() : index.toString()
                    }
                    renderItem={this.renderItem} 
                    ></FlatList>
            </View>
        )}
}
export default CitiesScreen;

const styles = StyleSheet.create({

    contanier: {
        flex: 1,
        padding: 16
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center"
    },
    cardWrapper: {
        backgroundColor: "#f0f0f0",
        padding:12,
        marginBottom:10,
        borderRadius:8
    },
    title:{
        fontSize:16,
        fontWeight:"bold"
    },
    subtitle:{
        fontSize:14,
        marginTop:6,
        color:"#555"
    },
    description:{
        fontSize:13,
        marginTop:6,
        color:"#555"
    },
    small:{
        marginTop:6,
        fontSize:12,
        color:"#777"
    }



});