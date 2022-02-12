import React, { useState, useEffect } from 'react'
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	BackHandler,
	RefreshControl
} from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import axios from 'axios'
import { getToken, deleteTokens, saveToken } from '../tokenFunc'
import * as Linking from 'expo-linking'
import Loading from './loading'
// import { frnddata } from '../customData.js'
// import * as Clipboard from 'expo-clipboard'
import { useIsFocused } from '@react-navigation/native'
import appdata from '../app.json'
import { StatusBar } from 'expo-status-bar'
import NavLayout from './layouts/nav'

export default function App({ route, navigation }) {
	const [refreshing, setRefreshing] = React.useState(false)
	const [link, setLink] = React.useState(false)
	const [loading, setLoading] = React.useState(true)
	const [darkMode, setDarkMode] = React.useState(false)

	const onRefresh = React.useCallback(() => {
		setRefreshing(true)
		getToken('spotifyAccessToken').then((token) => {
			fetchActivity(token)
			setRefreshing(false)
		})
		getLinkData()
	}, [])

	const [friendData, setFriendData] = useState([])

	function fetchActivity(token) {
		axios
			.get('https://untitledarhnhack.herokuapp.com/api/discover', {
				headers: {
					'x-access-token': token
				}
			})
			.then((res) => {
				setFriendData(res.data)
				// setFriendData(frnddata)
				// Clipboard.setString(JSON.stringify(res.data.friends))
				setLoading(false)
				console.log('data fetched')
			})
			.catch(async (err) => {
				console.log(err.message)
				await deleteTokens()
				console.log('error in fetching data')
				setLoading(false)
				navigation.navigate('Home')
			})
	}

	function getLinkData() {
		axios.get('https://spotivity.vercel.app/api/spotify/link').then((link) => {
			setLink(link.data.link)
		})
	}

	const isFocused = useIsFocused()

	// useEffect(() => {
	// 	getInitialData()
	// 	// getLinkData()
	// }, [isFocused])

	useEffect(() => {
		getInitialData()
	}, [])

	const getInitialData = async () => {
		getToken('accessToken').then(async (token) => {
			if (!token) {
				console.log('no token found')
				navigation.navigate('Home')
			}
			fetchActivity(token)
		})
	}

	// useEffect(() => {
	// 	BackHandler.addEventListener('hardwareBackPress', () => true)
	// 	return () =>
	// 		BackHandler.removeEventListener('hardwareBackPress', () => true)
	// }, [])

	return (
		<NavLayout active={'chat'} navigation={navigation}>
			<View style={{ flex: 1 }}>
				<ScrollView
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					style={{ backgroundColor: '#F4F9F5' }}
				>
					{/* {darkMode ? (
				<StatusBar style="light" backgroundColor={'#16DB93'} />
				) : (
					<StatusBar style="dark" backgroundColor={'#16DB93'} />
				)} */}

					<View
						style={{
							flex: 1,
							backgroundColor: '#F4F9F5',
							paddingBottom: 40 + 40 //change first item, 40 is fixed
						}}
					>
						<View style={{ marginTop: 15 }}>
							<View
								style={{
									paddingTop: hp('7%'),
									marginBottom: 20,
									paddingHorizontal: 35
								}}
							>
								<View
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}
								>
									<Image
										style={{
											height: 127 * 0.2,
											width: 524 * 0.2,
											marginBottom: 5
										}}
										source={require('../assets/brand.png')}
									/>
									<TouchableOpacity
									// onPress={() => {
									// 	if (darkMode) {
									// 		saveToken('theme', 'light')
									// 	} else {
									// 		saveToken('theme', 'dark')
									// 	}
									// 	setDarkMode(!darkMode)
									// }}
									>
										{darkMode ? (
											<View
												style={{
													height: 30,
													width: 30,
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													backgroundColor: '#666666',
													marginBottom: 8,
													borderRadius: 4
												}}
											>
												<Image
													style={{
														height: 15,
														width: 15
													}}
													source={require('../assets/sun.png')}
												/>
											</View>
										) : (
											<View
												style={
													{
														// opacity: 0.75,
														// height: 30,
														// width: 30,
														// display: 'flex',
														// justifyContent: 'center',
														// alignItems: 'center',
														// backgroundColor: '#eaeaea',
														// marginBottom: 8,
														// borderRadius: 4
													}
												}
											>
												<Image
													style={{
														height: 40,
														width: 40,
														borderRadius: 20
														// marginBottom: 10
													}}
													source={{
														uri: 'https://arhaanbahadur.co/me.jpeg'
													}}
													// source={require('../assets/moon.png')}
												/>
											</View>
										)}
									</TouchableOpacity>
								</View>
								<Text
									style={{
										fontSize: 30,
										fontFamily: 'HelveticaBold',
										color: darkMode ? '#fff' : '#222',
										marginTop: 10
									}}
								>
									Chat
								</Text>
								<Text
									style={{
										fontSize: 16,
										lineHeight: 23,
										fontFamily: 'HelveticaReg',
										color: '#AFAFAF',
										marginBottom: 30
									}}
								>
									Here are your text threads.
								</Text>
								{friendData.map((c) => {
									return (
										<View key={c.username}>
											<TouchableOpacity
												style={{
													borderColor: '#0AD98D',
													padding: 20,
													paddingBottom: 0,
													borderRadius: 10,
													borderWidth: 1,
													marginBottom: 25
												}}
											>
												<View>
													{/* <Image
												style={{
													height: wp('9%') * 5.2,
													width: wp('16%') * 5.2,
													// resizeMode: 'contain',
													marginBottom: 5,
													borderRadius: 7.5
												}}
												source={{
													uri: 'https://res.cloudinary.com/arhaanb/image/upload/delhidesignfoundry.png'
												}}
											/> */}

													<Image
														style={{
															height: wp('5%') * 5.2,
															width: wp('5%') * 5.2,
															// resizeMode: 'contain',
															marginBottom: 5,
															borderRadius: 7.5
														}}
														source={{
															uri:
																c?.icon ||
																'https://cdn-images-1.medium.com/max/1600/1*SkFEBcaoea9WXIdQg2GsTw.png'
														}}
													/>
												</View>
												<Text
													style={{
														fontSize: 18,
														lineHeight: 23,
														fontFamily: 'HelveticaBold',
														color: '#2a2a2a',
														opacity: 0.8,
														marginBottom: 0,
														marginTop: 10
													}}
												>
													{/* {JSON.stringify(c)} */}
													{c?.name}
												</Text>
												<Text
													style={{
														fontSize: 14,
														lineHeight: 23,
														fontFamily: 'HelveticaReg',
														color: '#2a2a2a',
														opacity: 0.5
													}}
												>
													{/* {JSON.stringify(c?.icon)} */}
													{c?.tagline}
												</Text>

												<Text
													style={{
														fontSize: 14,
														lineHeight: 23,
														fontFamily: 'HelveticaReg',
														color: '#0AD98D',
														marginBottom: 15,
														opacity: 0.5
													}}
												>
													{/* {JSON.stringify(c)} */}
													{c?.investment?.goal
														? `Goal: $${c?.investment?.goal}`
														: null}
												</Text>
											</TouchableOpacity>
										</View>
									)
								})}

								<TouchableOpacity
									onPress={() => {
										deleteTokens()
										navigation.navigate('Home')
									}}
								>
									<Text
										style={{
											fontSize: 14,
											marginBottom: -1,
											color: darkMode ? '#E55454' : '#cf4944',
											fontFamily: 'HelveticaReg'
										}}
									>
										Logout
									</Text>
								</TouchableOpacity>
								{/* 
						<Text
						style={{
							fontSize: 12,
								fontFamily: 'HelveticaReg',
								color: darkMode ? '#969696' : '#5a5a5a'
							}}
							>
							Made with{' '}
							<Image
								style={{
									height: 18,
									width: 18
								}}
								source={require('../assets/heart.png')}
								/>{' '}
								by{' '}
								<Text
								onPress={() => {
									Linking.openURL(
										link ? link : 'https://open.spotify.com/user/arhaanb'
										)
									}}
									style={{ textDecorationLine: 'underline' }}
									>
									Arhaan Bahadur
									</Text>
								</Text> */}

								{/* <Text
							style={{
								fontSize: 10,
								fontFamily: 'HelveticaReg',
								color: darkMode ? '#787878' : '#5a5a5a',
								marginTop: 15
							}}
							>
							v{appdata?.expo?.version ? appdata?.expo?.version : '0.0.0'}{' '}
							Spotivity
							</Text>
							<Text
							style={{
								fontSize: 10,
								fontFamily: 'HelveticaReg',
								color: darkMode ? '#787878' : '#5a5a5a',
								marginTop: 0
							}}
							>
							This app is not affiliated with Spotify
						</Text> */}
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		</NavLayout>
	)
}
