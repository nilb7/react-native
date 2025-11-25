import React from "react";
import { Text, StyleSheet, View, FlatList, Button, TouchableOpacity } from "react-native";

const students = [
  { name: "Eden", surname: "Rocha", age: "17" },
  { name: "Kaylen", surname: "Tyler", age: "15" },
  { name: "Ellie", surname: "Mcclure", age: "17" },
  { name: "Journey", surname: "Blackburn", age: "16" },
];

const ListScreen = () => {
  let count = 0; 

  return (
    <View>
      <Text style={styles.textStyle}>List of Students</Text>
      <Button title="Press Me" 
      onPress={() => console.log("Button Pressed!", count++)} />
      <Button
      title="Another Button"
      onPress={() => navigation.navigate("Main")}>
      </Button>
       

      

      <FlatList
        data={students}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text style={styles.textStyle}>
            {item.name} {item.surname} — Age {item.age}
          </Text>
        )}
      />


      <TouchableOpacity
      
      style={styles.touchableBtn}
      onPress={() => console.log("TouchableOpacity Pressed!", count++)}>
      <Text stlye={styles.btnText}>TEXT</Text>
      </TouchableOpacity>
    </View>

    
  );
};


const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    marginVertical: 5,color: 'blue'
  },
  btnText: {
    fontSize: 22,
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  touchableBtn:{
    backgroundColor: 'yellow',
    marginVertical: 15,
    paddingVertical: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  }
  
 

});

export default ListScreen;
