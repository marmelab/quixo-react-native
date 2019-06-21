import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

const background = require("../assets/bg-quixo.jpg");

const styles = StyleSheet.create({
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
    justifyContent: "center",
    margin: 30
  },
  playText: {
    color: "#fff"
  },
  input: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center"
  }
});

const JoinScreen = ({ navigation }) => {
  const [gameId, setGameId] = useState("");
  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.background}>
        <TextInput
          style={styles.input}
          placeholder="Type the id of the game here"
          onChangeText={text => setGameId(text)}
          keyboardType={"number-pad"}
          textAlign={"center"}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Game", { id: gameId })}
          style={styles.playButton}
        >
          <Text style={styles.playText}>Join !</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default JoinScreen;
