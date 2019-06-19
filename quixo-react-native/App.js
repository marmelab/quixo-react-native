import { createStackNavigator, createAppContainer } from "react-navigation";

import GameScreen from "./screens/GameScreen";
import HomeScreen from "./screens/HomeScreen";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Game: {
      screen: GameScreen
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    },
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
