import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";

const background = require("../assets/bg-quixo.jpg");

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  buttons: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "20%"
  },
  playButton: {
    width: "50%",
    height: 60,
    backgroundColor: "#003366",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  playText: {
    color: "#fff",
    fontFamily: "Roboto"
  }
});

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Game")}
            style={styles.playButton}
          >
            <Text style={styles.playText}>Play User VS User !</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Game", { solo: true })}
            style={styles.playButton}
          >
            <Text style={styles.playText}>Play User VS AI !</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Join")}
            style={styles.playButton}
          >
            <Text style={styles.playText}>Join Game !</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
