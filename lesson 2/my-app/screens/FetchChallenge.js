import React from "react";  
import { FlatList } from "react-native-web";

class FetchChallenge extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],

        };
    }

    
async componentDidMount() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments")
        const jsondata = await response.json();
        this.setState({comments: jsondata});
    }catch (error) {
        console.error("Error fetching comments",error);
    }
    }

    render() {
        return (
            <View>
                <FlatList data={this.state.comments}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=>  (
                    <View>
                        <Text>{item.name}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.body}</Text>
                        </View>


                ) }
                >

                </FlatList>
            </View>

        )
    }
        
        

}

export default FetchChallenge;
