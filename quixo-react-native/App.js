import { createStackNavigator, createAppContainer } from "react-navigation";

import GameScreen from "./screens/GameScreen";
import HomeScreen from "./screens/HomeScreen";
import JoinScreen from "./screens/JoinScreen";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Game: GameScreen,
    Join: JoinScreen
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
