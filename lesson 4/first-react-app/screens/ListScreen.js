import React from "react";
import { View, Text } from "react-native";
import { Button, FlatList } from "react-native-web";

const studentav = [
    { name: "Nil", surname: "Bakija", age: 15 },
    { name: "Ensar", surname: "Mustafa", age: 16 },
    { name: "Eden", surname: "Kurtolli", age: 16 },
];

function ListScreen() {
    return (
        <View>
            <Button
                title="Click Me"
                onPress={() => {
                    console.log("Button Pressed");
                }
                }
                color = "blue"
                >

            </Button>
            <Text style={styles.textStyle}>
                Lista e studentav
            </Text>
            <FlatList data ={studentav}
            keyExtractor={(item)=item.name}
            renderItem={(item)=>(
                <Text style={styles.textStyle} >
                    {item.name} {item.surname}, {item.age} vjec
                </Text>  

                


                    

            )}

            >


            </FlatList>

        </View>
    );
}
const styles = StyleSheet.create(
    { 
    textStyle: {
        fontSize: 30,
    },
}
)

export default ListScreen;