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
import NavLayout from './layouts/nav'
import investbg from '../assets/investbg.png'
import InvestCard from './components/invested.jsx'

export default function App({ route, navigation }) {
	const [refreshing, setRefreshing] = React.useState(false)
	const [loading, setLoading] = React.useState(true)

	const onRefresh = React.useCallback(() => {
		setRefreshing(true)
		getToken('accessToken').then((token) => {
			fetchActivity(token)
			setRefreshing(false)
		})
	}, [])

	const [friendData, setFriendData] = useState([])

	function fetchActivity(token) {
		axios
			.get('https://untitledarhnhack.herokuapp.com/api/user', {
				headers: {
					'x-access-token': token
				}
			})
			.then((res) => {
				// console.log(res.data)
				setFriendData(res.data)
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
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				style={{ backgroundColor: '#F4F9F5' }}
				overScrollMode={'never'}
			>
				{/* <Text style={{ marginTop: 80 }}>
					{JSON.stringify(friendData?.user)}
				</Text> */}
				<View
					style={{
						flex: 1,
						backgroundColor: '#F4F9F5',
						paddingBottom: 40 + 40 // change first item, 40 is fixed
					}}
				>
					<View style={{ marginTop: 15 }}>
						<View
							style={{
								paddingTop: hp('7%'),
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
											}}
											source={{
												uri: friendData?.user?.image
													? friendData?.user?.image
													: 'https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg'
											}}
										/>
										<View>
											<Text
												style={{
													fontSize: 20,
													fontFamily: 'HelveticaBold',
													color: '#222'
												}}
											>
												Hey,{' '}
												{friendData?.user?.fullname
													? friendData?.user?.fullname.split(' ')[0]
													: friendData?.user?.username}
												!
											</Text>
											<Text
												style={{
													fontSize: 15,
													fontFamily: 'HelveticaReg',
													color: '#222',
													opacity: 0.5
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
										}}
									>
										Total Capital Invested
									</Text>
									<Text
										style={{
											fontSize: 32,
											fontFamily: 'HelveticaBold',
											color: '#fff'
										}}
									>
										$
										{friendData?.totalinv
											? friendData?.totalinv
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
											: 0}
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
										}}
									>
										View recommended projects{'   '}&rarr;
									</Text>
								</TouchableOpacity>
							</View>
						</View>

						{loading ? (
							<View style={{ height: hp('48%') }}>
								<Loading />
							</View>
						) : (
							<View>
								<View style={{ marginTop: 20, paddingHorizontal: 35 }}>
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
								<ScrollView
									contentContainerStyle={{
										paddingLeft: 35
									}}
									horizontal={true}
									showsHorizontalScrollIndicator={false}
									showsVerticalScrollIndicator={false}
									overScrollMode={'never'}
								>
									{friendData?.investments?.length > 0 ? (
										<View
											style={{
												display: 'flex',
												flexDirection: 'row',
												paddingRight: 35
											}}
										>
											{friendData?.investments?.map((c, index) => {
												return (
													<View
														key={index}
														style={{
															marginRight:
																index == 0 &&
																friendData?.investments.length !== 1
																	? 15
																	: 0
														}}
													>
														{/* <Text>
															{JSON.stringify(friendData?.compids[index].name)}
														</Text> */}
														<InvestCard
															name={
																friendData?.compids[index]?.name ||
																'Company Name'
															}
															tagline={
																friendData?.compids[index]?.tagline ||
																'This is a tagline.'
															}
															icon={friendData?.compids[index]?.icon}
															page="invested"
															amt={c?.amount}
															equity={c?.percentage}
														/>
													</View>
												)
											})}
										</View>
									) : (
										<View
											style={{
												padding: 20,
												backgroundColor: 'white',
												borderRadius: 10,
												width: wp('100%') - 70
											}}
										>
											<Text
												style={{
													fontSize: 15,
													color: '#222',
													fontFamily: 'HelveticaBold'
												}}
											>
												No investments found
											</Text>
											<TouchableOpacity
												onPress={() => navigation.navigate('Discover')}
											>
												<Text
													style={{
														fontSize: 15,
														color: '#222',
														fontFamily: 'HelveticaReg',
														marginTop: 20,
														color: '#0AD98D'
													}}
												>
													Get started &rarr;
												</Text>
											</TouchableOpacity>
										</View>
									)}
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
									horizontal={friendData?.companies?.length > 1 ? true : false}
									showsHorizontalScrollIndicator={false}
									showsVerticalScrollIndicator={false}
									overScrollMode={'never'}
								>
									{friendData?.companies?.length > 0 ? (
										<View
											style={{
												display: 'flex',
												flexDirection: 'row',
												paddingRight: 35
											}}
										>
											{friendData?.companies?.map((c, index) => {
												return (
													<View
														key={index}
														style={{
															marginRight:
																index == 0 && friendData?.companies.length !== 1
																	? 15
																	: 0
														}}
													>
														{/* <Text>{JSON.stringify(c.investment)}</Text> */}
														<InvestCard
															name={c?.name || 'Company Name'}
															tagline={c?.tagline || 'This is a tagline.'}
															icon={c?.icon}
															goal={c?.investment?.goal}
															equity={
																(parseFloat(c?.investment?.current) /
																	parseFloat(c?.investment?.goal)) *
																100
															}
														/>
													</View>
												)
											})}
										</View>
									) : (
										<View
											style={{
												padding: 20,
												backgroundColor: 'white',
												borderRadius: 10
											}}
										>
											<Text
												style={{
													fontSize: 15,
													color: '#222',
													fontFamily: 'HelveticaReg'
												}}
											>
												No companies found
											</Text>
										</View>
									)}
								</ScrollView>
							</View>
						)}

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
		</NavLayout>
	)
}
