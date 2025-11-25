import { View, Text, StyleSheet , Button} from "react-native";

export default function MainScreen({ navigation }) {
  return (
<View>

    <Button
       style={styles.mainBtn}
      title="Go to List Screen"
      onPress={() => navigation.navigate("List")}>
    </Button>

    <Button
      title="Go to nilScreen"
      onPress={() => navigation.navigate("nil")}>
    </Button>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },

    mainBtn:{
    backgroundColor: 'yellow',
    marginVertical: 15,
    paddingVertical: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  }
});
