import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

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
    alignItems: "center",
    justifyContent: "center"
  },
  playText: {
    color: "#fff"
  }
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/bg-quixo.jpg")}
        style={styles.background}
      >
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("game")}
          style={styles.playButton}
        >
          <Text style={styles.playText}>Play Quixo !</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default createAppContainer(AppNavigator);
