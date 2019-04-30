import { createStackNavigator, createAppContainer } from 'react-navigation'
import SplashScreen from '../Containers/SplashScreen'
import Login from '../Containers/Login'
import Register from '../Containers/Register'
import Homepage from '../Containers/Homepage'
import AddReport from '../Containers/Homepage/Home/AddReport'

const AppNavigator = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    Login: { screen: Login },
    Register: { screen: Register },
    Homepage: { screen: Homepage },
    AddReport: { screen: AddReport }
  },
  {
    headerMode: 'none',
    initialRouteName: 'SplashScreen',
  }
)

export default createAppContainer(AppNavigator)
