import { createAppContainer } from "react-navigation";
import HomeScreen from "./src/HomeScreen";
import DoggoDetailScreen from "./src/DoggoDetailScreen";


const { createStackNavigator } = require("react-navigation-stack");

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  DoggoDetail: {
    screen: DoggoDetailScreen,
  }
})

export default createAppContainer(AppNavigator);