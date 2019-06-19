import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";

const styles = StyleSheet.create({
  container: {},
  background: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  playButton: {
    width: "50%",
    height: 60,
    backgroundColor: "#003366",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  playText: {
    color: "#fff"
  }
});

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bg-quixo.jpg")}
        style={styles.background}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Game")}
          style={styles.playButton}
        >
          <Text style={styles.playText}>Play Quixo !</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
