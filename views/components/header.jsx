import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import axios from 'axios'
import { getToken, saveToken, deleteTokens } from '../../tokenFunc.js'

export default function App({ style, navigation }) {
	const [userData, setUserData] = useState({})

	function fetchData(token) {
		axios
			.get('https://untitledarhnhack.herokuapp.com/api/user', {
				headers: {
					'x-access-token': token
				}
			})
			.then((res) => {
				setUserData(res.data.user)
				console.log('data fetched')
			})
			.catch(async (err) => {
				console.log(err.message)
				await deleteTokens()
				console.log('error in fetching data')
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
			fetchData(token)
		})
	}

	return (
		<View style={[style ? style : null]}>
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
					source={require('../../assets/brand.png')}
				/>
				<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
					<Image
						style={{
							height: 40,
							width: 40,
							borderRadius: 20
						}}
						source={{
							uri: userData?.image
								? userData?.image
								: 'https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg'
						}}
					/>
				</TouchableOpacity>
			</View>
		</View>
	)
}
