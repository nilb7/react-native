import { View, Text, StyleSheet , Button} from "react-native";

export default function nilScreen({ navigation }) {
  return (


    <Button
       style={styles.mainBtn}
      title="Go to List Screen"
      onPress={() => navigation.navigate("List")}>
    </Button>
    
  );
}