import React from 'react'
import { SafeAreaView, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'

//routes
import Home from './views/home'
import Login from './views/login'
import Activity from './views/activity'
import Webviews from './views/webviews'

const Stack = createStackNavigator()

function App() {
	const [fontsLoaded] = useFonts({
		HelveticaBold: require('./assets/fonts/helveticanowbold.otf'),
		HelveticaReg: require('./assets/fonts/HelveticaNowDisplay-Regular.otf'),
		HelveticaMed: require('./assets/fonts/HelveticaNowDisplay-Medium.otf')
	})

	if (!fontsLoaded) {
		return <AppLoading />
	} else {
		return (
			// <SafeAreaView
			// 	style={{
			// 		flex: 1,
			// 		backgroundColor: '#ffffff'
			// 	}}
			// >
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName={Home}
					screenOptions={{
						headerShown: false,
						cardStyle: { backgroundColor: '#FFFFFF', opacity: 1 }
					}}
				>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Activity" component={Activity} />
					<Stack.Screen name="Webviews" component={Webviews} />
				</Stack.Navigator>
				<StatusBar style="dark" backgroundColor={'#ffffff'} />
			</NavigationContainer>
			// </SafeAreaView>
		)
	}
}

export default App
