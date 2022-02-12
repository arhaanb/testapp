import React from 'react'
import { SafeAreaView, Platform, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'

//routes
import Home from './views/home'
import Login from './views/login'
import Discover from './views/discover'
import Chat from './views/chat'
import Profile from './views/profile'
import Webviews from './views/webviews'
//Onboarding
import Two from './views/onboard/two'
import Three from './views/onboard/three'

const Stack = createStackNavigator()

function App() {
	const [fontsLoaded] = useFonts({
		HelveticaBold: require('./assets/fonts/CircularStd-Medium.otf'),
		HelveticaReg: require('./assets/fonts/CircularStd-Book.otf'),
		HelveticaMed: require('./assets/fonts/CircularStd-Medium.otf')
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

			<View style={{ flex: 1, backgroundColor: '#0AD98D' }}>
				<NavigationContainer
					// mode={'modal'}
					style={{ backgroundColor: '#0AD98D' }}
				>
					<View style={{ flex: 1, backgroundColor: '#0AD98D' }}>
						<StatusBar style="dark" backgroundColor={'#0AD98D'} />
						<Stack.Navigator
							// mode={'modal'}
							initialRouteName={Home}
							screenOptions={{
								headerShown: false,
								cardStyle: { backgroundColor: '#FFFFFF', opacity: 1 }
							}}
						>
							<Stack.Screen name="Home" component={Home} />
							<Stack.Screen name="Login" component={Login} />
							<Stack.Screen name="Discover" component={Discover} />
							<Stack.Screen name="Chat" component={Chat} />
							<Stack.Screen name="Profile" component={Profile} />
							{/* <Stack.Screen name="Webviews" component={Webviews} /> */}
							{/* onboarding screens */}
							<Stack.Screen name="Two" component={Two} />
							<Stack.Screen name="Three" component={Three} />
						</Stack.Navigator>
						<StatusBar style="dark" backgroundColor={'#ffffff'} />
					</View>
				</NavigationContainer>
			</View>
			// </SafeAreaView>
		)
	}
}

export default App
