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
import NavLayout from './layouts/nav'
import InvestCard from './components/discovercard.jsx'
import Header from './components/header.jsx'

export default function App({ route, navigation }) {
	const [refreshing, setRefreshing] = React.useState(false)
	const [loading, setLoading] = React.useState(true)

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

	// useEffect(() => {
	// 	BackHandler.addEventListener('hardwareBackPress', () => true)
	// 	return () =>
	// 		BackHandler.removeEventListener('hardwareBackPress', () => true)
	// }, [])

	return (
		<NavLayout active={'discover'} navigation={navigation}>
			<View style={{ flex: 1 }}>
				<ScrollView
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					style={{ backgroundColor: '#F4F9F5' }}
					overScrollMode={'never'}
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
									Discover
								</Text>
								<Text
									style={{
										fontSize: 16,
										lineHeight: 23,
										fontFamily: 'HelveticaReg',
										color: '#AFAFAF',
										marginBottom: 15
									}}
								>
									Discover new startups to invest in.
								</Text>

								{loading ? (
									<View style={{ height: hp('50%') }}>
										<Loading />
									</View>
								) : (
									<View>
										{friendData.map((c) => {
											return (
												<View key={c.username}>
													{/* <Text>{JSON.stringify(c?.investment)}</Text> */}
													<View style={{ marginBottom: 15 }}>
														<InvestCard
															icon={c?.icon ? c?.icon : null}
															name={c?.name}
															tagline={c?.tagline}
															page={'discover'}
															mainlink={
																c?.website || c?.pitchdeck || c?.video || null
															}
															goal={c?.investment}
														/>
													</View>
												</View>
											)
										})}
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
