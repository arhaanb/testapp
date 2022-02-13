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
import Header from './components/header.jsx'

export default function App({ route, navigation }) {
	const [refreshing, setRefreshing] = React.useState(false)
	const [link, setLink] = React.useState(false)
	const [loading, setLoading] = React.useState(true)

	const arrtest = [0, 1, 2]

	const onRefresh = React.useCallback(() => {
		setRefreshing(true)
		getToken('spotifyAccessToken').then((token) => {
			fetchActivity(token)
			setRefreshing(false)
		})
		getLinkData()
	}, [])

	const [chatData, setChatData] = useState([])

	function fetchActivity(token) {
		axios
			.get('https://untitledarhnhack.herokuapp.com/api/threads', {
				headers: {
					'x-access-token': token
				}
			})
			.then((res) => {
				setChatData(res.data)
				setLoading(false)
				// console.log('data fetched')
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
								<Header navigation={navigation} />
								<Text
									style={{
										fontSize: 30,
										fontFamily: 'HelveticaBold',
										color: '#222',
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
										marginBottom: 20
									}}
								>
									Here are your text threads.
								</Text>

								{loading ? (
									<View style={{ height: hp('50%') }}>
										<Loading />
									</View>
								) : (
									<View>
										{chatData?.threads?.length > 0 ? (
											<View>
												{chatData?.threads?.map((msg, index) => {
													return (
														<TouchableOpacity
															key={index}
															style={{
																display: 'flex',
																flexDirection: 'row',
																justifyContent: 'space-between',
																alignItems: 'center',
																paddingVertical: 20,
																paddingHorizontal: 20,
																backgroundColor: '#fff',
																borderTopEndRadius: index + 1 == 1 ? 10 : 0,
																borderTopStartRadius: index + 1 == 1 ? 10 : 0,
																borderBottomStartRadius:
																	index + 1 == chatData.threads.length ? 10 : 0,
																borderBottomEndRadius:
																	index + 1 == chatData.threads.length ? 10 : 0,
																borderBottomColor: '#eaeaea',
																borderBottomWidth:
																	index + 1 == chatData.threads.length
																		? 0
																		: 0.5,
																borderTopColor: '#eaeaea',
																borderTopWidth: index + 1 == 1 ? 0 : 0.5
															}}
														>
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
																		marginRight: 15,
																		borderWidth: chatData?.users[index]?.image
																			? 0
																			: 1,
																		borderColor: 'lightgreen'
																	}}
																	source={{
																		uri: chatData?.users[index]?.image
																			? chatData?.users[index]?.image
																			: 'https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg'
																	}}
																/>
																<View>
																	<Text
																		style={{
																			fontSize: 17,
																			fontFamily: 'HelveticaBold',
																			color: '#222'
																		}}
																	>
																		{chatData?.users[index]?.fullname || 'Name'}
																	</Text>
																	<Text
																		style={{
																			fontSize: 15,
																			fontFamily: 'HelveticaBold',
																			color: '#222',
																			opacity: 0.5
																		}}
																	>
																		{chatData?.users[index]?.username ||
																			'username'}
																	</Text>
																</View>
															</View>
															<Text
																style={{
																	fontSize: 17,
																	fontFamily: 'HelveticaReg',
																	color: '#7a7a7a',
																	marginRight: 10
																}}
															>
																&rarr;
															</Text>
														</TouchableOpacity>
													)
												})}
											</View>
										) : (
											<Text
												style={{
													fontSize: 17,
													fontFamily: 'HelveticaBold',
													color: '#222',
													opacity: 0.75,
													lineHeight: 25
												}}
											>
												No threads available. Start a chat and it will appear
												here.
											</Text>
										)}
									</View>
								)}
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		</NavLayout>
	)
}
