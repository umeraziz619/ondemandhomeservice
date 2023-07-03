// In App.js in a new project
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './screen/Splash';
import Login from './screen/Login';
import Register from './screen/Register';
import Getstarted from './screen/Getstarted';
import Home from './screen/Home';
import Profile from './screen/Profile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Myjobs from './screen/Myjobs';
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
          name="Root"
          component={Root}
          options={{headerShown:false
          }}
        />
        <Stack.Screen options={{headerShown:false}} name="Splash" component={Splash} />
        <Stack.Screen options={{headerShown:false}} name="GetStarted" component={Getstarted} />
        <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown:false}} name="Register" component={Register} />
        <Stack.Screen options={{headerShown:false}} name='Home' component={Home} />   
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function Root() {
  return (
    <Drawer.Navigator
    drawerPosition="right"
    drawerType="front"
    gestureEnabled={true}
    drawerStyle={{ width: 200 }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name='Myjobs' component={Myjobs} />
    </Drawer.Navigator>
  );
}
export default App;

