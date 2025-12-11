import React from "react";  
import { FlatList } from "react-native-web";

class PostsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],

        };
    }

    
async componentDidMount() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const jsondata = await response.json();
        this.setState({posts: jsondata});
    }catch (error) {
        console.error("Error fetching posts",error);
    }
    }

    render() {
        return (
            <View>
                <FlatList data={this.state.posts}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=>  (
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.body}</Text>
                        </View>


                ) }
                >

                </FlatList>
            </View>

        )
    }
        
        

}

export default PostsScreen;
