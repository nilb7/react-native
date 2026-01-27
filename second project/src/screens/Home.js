import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.swiper}
        showsPagination={true}
        dotColor="rgba(255,255,255,0.5)"
        activeDotColor="#fff"
        paginationStyle={styles.pagination}
        loop={true}
        autoplay={true}
        autoplayTimeout={4}>

        <View style={styles.slide}>
          <Image source={require("../../assets/dog.png")} style={styles.slideImage} resizeMode="cover" />
          <View style={styles.overlay}>
            <Text style={styles.slideTitle}>Welcome to Our App</Text>
            <Text style={styles.slideText}>Discover amazing features and explore new possibilities</Text>
          </View>
        </View>

        <View style={styles.slide}>
          <Image source={require("../../assets/icon.png")} style={styles.slideImage} resizeMode="cover" />
          <View style={styles.overlay}>
            <Text style={styles.slideTitle}>Explore Features</Text>
            <Text style={styles.slideText}>Find everything you need in one place</Text>
          </View>
        </View>

        <View style={styles.slide}>
          <Image source={require("../../assets/adaptive-icon.png")} style={styles.slideImage} resizeMode="cover" />
          <View style={styles.overlay}>
            <Text style={styles.slideTitle}>Stay Connected</Text>
            <Text style={styles.slideText}>Keep up with the latest updates and news</Text>
          </View>
        </View>

        <View style={styles.slide}>
          <Image source={require("../../assets/splash-icon.png")} style={styles.slideImage} resizeMode="cover" />
          <View style={styles.overlay}>
            <Text style={styles.slideTitle}>Get Started</Text>
            <Text style={styles.slideText}>Ready to begin your journey?</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
              <Text style={styles.buttonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper: {
    flex: 1,
  },
  slide: {
    flex: 1,
    position: 'relative',
  },
  slideImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6,
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 30,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  slideText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pagination: {
    bottom: 20,
  },
});

export default Home;
