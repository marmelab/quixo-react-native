import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/bg-quixo.jpg")}
        style={styles.background}
      >
        <TouchableOpacity
          onPress={() => console.log("ici")}
          style={styles.playButton}
        >
          <Text style={styles.playText}>Play Quixo !</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  playButton: {
    width: "50%",
    height: 60,
    backgroundColor: "#003366",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  playText: {
    color: "#fff"
  }
});
