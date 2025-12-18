import React from "react";
import { Component } from "react";
import { View, Text, FlatList } from "react-native";
import data from "../data/countries.json";

class CountriesScreen extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            countries: [] 
        };
    }

    componentDidMount() {
        this.setState({
            countries:data,
        });
    }

    renderItem = ({ item }) => {
        const {name,country,description} = item;
         
        return (
            <View>
                <Text>
                    City Name:{name}
                </Text>
                <Text>
                    Country Name:{name}
                </Text>
                <Text>
                    Description:{description}
                </Text>
            </View>
        );
    }

    render(){
        return (
            <View>
                <Text> Countries Screen</Text>

                <FlatList
                    data={this.state.countries}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={this.renderItem}
                    >

                </FlatList>
            </View>
        );
    }



}
export default CountriesScreen;
