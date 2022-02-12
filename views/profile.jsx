import React, { useState, useEffect } from 'react'
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	BackHandler,
	RefreshControl,
	ImageBackground
} from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import axios from 'axios'
import { getToken, deleteTokens, saveToken } from '../tokenFunc'
import * as Linking from 'expo-linking'
import Loading from './loading'
import { useIsFocused } from '@react-navigation/native'
import appdata from '../app.json'
import { StatusBar } from 'expo-status-bar'
import NavLayout from './layouts/nav'
import AutoHeightImage from 'react-native-auto-height-image'
import investbg from '../assets/investbg.png'
import InvestCard from './components/invested.jsx'

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

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', () => true)
		return () =>
			BackHandler.removeEventListener('hardwareBackPress', () => true)
	}, [])

	return (
		<NavLayout active={'profile'} navigation={navigation}>
			{/* <View style={{ flex: 1 }}> */}
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				style={{ backgroundColor: '#F4F9F5' }}
				overScrollMode={'never'}
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
								// marginBottom: 20,
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
								<TouchableOpacity>
									<View
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'flex-start',
											alignItems: 'center'
										}}
									>
										<Image
											style={{
												height: 50,
												width: 50,
												borderRadius: 1000,
												marginRight: 15
												// marginBottom: 10
											}}
											source={{
												uri: 'https://arhaanbahadur.co/me.jpeg'
											}}
										/>
										<View>
											<Text
												style={{
													fontSize: 20,
													fontFamily: 'HelveticaBold',
													color: '#222'
													// marginTop: 10
												}}
											>
												Hey, {'Arhaan Bahadur'.split(' ')[0]}!
											</Text>
											<Text
												style={{
													fontSize: 15,
													fontFamily: 'HelveticaReg',
													color: '#222',
													opacity: 0.5
													// marginTop: 10
												}}
											>
												You have a few updates
											</Text>
										</View>
									</View>
								</TouchableOpacity>

								<TouchableOpacity onPress={() => navigation.navigate('Chat')}>
									<Image
										style={{
											height: 30,
											width: 30,
											marginBottom: 5
										}}
										source={require('../assets/icons/notif.png')}
									/>
								</TouchableOpacity>
							</View>

							<ImageBackground
								source={investbg}
								resizeMode="cover"
								style={{ flex: 1, justifyContent: 'center', marginTop: 30 }}
							>
								<View
									style={{
										height: 122 * ((wp('100%') - 35 * 2) / 321),
										width: wp('100%') - 35 * 2,
										padding: 20
									}}
								>
									<Text
										style={{
											fontSize: 20,
											fontFamily: 'HelveticaReg',
											color: '#fff'
											// marginTop: 30
										}}
									>
										Total Capital Invested
									</Text>
									<Text
										style={{
											fontSize: 32,
											fontFamily: 'HelveticaBold',
											color: '#fff'
											// marginTop: 30
										}}
									>
										$40,000
									</Text>
								</View>
							</ImageBackground>
							<View
								style={{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<TouchableOpacity
									onPress={() => navigation.navigate('Discover')}
									style={{
										marginTop: -30,
										backgroundColor: '#fff',
										width: wp('72%'),
										paddingVertical: 20,
										borderRadius: 20
									}}
								>
									<Text
										style={{
											fontSize: 14,
											fontFamily: 'HelveticaReg',
											textAlign: 'center'
											// marginTop: 30
										}}
									>
										View recommended projects{'   '}&rarr;
									</Text>
								</TouchableOpacity>
							</View>

							<View style={{ marginTop: 20 }}>
								<Text
									style={{
										fontSize: 18,
										lineHeight: 23,
										fontFamily: 'HelveticaBold',
										color: '#222',
										marginBottom: 12.5
									}}
								>
									Invested Projects
								</Text>
							</View>
						</View>

						<ScrollView
							contentContainerStyle={{
								paddingLeft: 35,
							}}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							overScrollMode={'never'}
						>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									// justifyContent: 'flex-start',
									// alignItems: 'center'
									paddingRight: 35
								}}
							>
								<View style={{ marginRight: 15 }}>
									<InvestCard />
								</View>
								<View>
									<InvestCard />
								</View>
							</View>
						</ScrollView>

						<View style={{ marginTop: 30, paddingHorizontal: 35 }}>
							<Text
								style={{
									fontSize: 18,
									lineHeight: 23,
									fontFamily: 'HelveticaBold',
									color: '#222',
									marginBottom: 12.5
								}}
							>
								Your Companies
							</Text>
						</View>

						<ScrollView
							contentContainerStyle={{
								paddingLeft: 35,
								marginBottom: 30
							}}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							overScrollMode={'never'}
						>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									// justifyContent: 'flex-start',
									// alignItems: 'center'
									paddingRight: 35
								}}
							>
								<View style={{ marginRight: 15 }}>
									<InvestCard />
								</View>
								<View>
									<InvestCard />
								</View>
							</View>
						</ScrollView>

						{/* {friendData.map((c) => {
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
												{c?.investment?.goal
													? `Goal: $${c?.investment?.goal}`
													: null}
											</Text>
										</TouchableOpacity>
									</View>
								)
							})} */}
						<View style={{ paddingHorizontal: 35, marginBottom: 20 }}>
							<TouchableOpacity
								style={{
									borderColor: '#cf4944',
									borderWidth: 1,
									paddingVertical: 15.65,
									paddingHorizontal: 25,
									borderRadius: 10,
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}
								onPress={() => {
									deleteTokens()
									navigation.navigate('Home')
								}}
							>
								<Text
									style={{
										fontSize: 15,
										color: '#cf4944',
										fontFamily: 'HelveticaReg'
									}}
								>
									Logout
								</Text>

								<Text
									style={{
										fontSize: 15,
										color: '#cf4944',
										fontFamily: 'HelveticaReg',
										marginRight: 10
									}}
								>
									&rarr;
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
			{/* </View> */}
		</NavLayout>
	)
}
