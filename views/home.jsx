import React, { useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import global from '../styles'
import { getToken } from '../tokenFunc'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { useIsFocused } from '@react-navigation/native'

export default function App({ route, navigation }) {
	const isFocused = useIsFocused()

	useEffect(() => {
		getInitialData()
	}, [isFocused])

	const getInitialData = async () => {
		await getToken('spotifyAccessToken').then((token) => {
			if (token?.length > 0) {
				navigation.navigate('Activity')
			}
		})
	}

	return (
		<ScrollView>
			<View
				style={{
					position: 'relative',
					// height: '100%',
					paddingVertical: hp('100%') >= 750 ? hp('12%') : hp('7%')
				}}
			>
				<View style={global.container}>
					<Image
						style={{
							height: wp('11.75%'),
							width: wp('11.75%'),
							marginBottom: 20,
							// marginTop: 90
							borderRadius: 30
						}}
						source={require('../assets/icon.png')}
					/>
					{/* <View
						style={{
							height: wp('11.75%'),
							width: wp('11.75%'),
							backgroundColor: '#222',
							borderRadius: wp('11.75%'),
							marginBottom: 20
							// marginTop: 90
						}}
						source={require('../assets/spotify.png')}
					/> */}
					<Text
						style={{
							fontSize: wp('7.5%'),
							fontFamily: 'HelveticaBold',
							marginBottom: 17,
							lineHeight: 42
						}}
					>
						PayOut. Get funding &mdash; quick & easy.
					</Text>
					<View
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Image
							style={{
								height: (778 / 1068) * wp('85%'),
								width: wp('85%'),
								resizeMode: 'center',
								borderRadius: 10,
								marginBottom: 25
							}}
							source={require('../assets/music.png')}
						/>
						{/* <View
							style={{
								height: (778 / 1068) * wp('85%'),
								width: wp('85%'),
								backgroundColor: '#555',
								borderRadius: 10,
								resizeMode: 'center',
								marginBottom: 25
							}}
						/> */}
					</View>
					<Text
						style={{
							fontSize: 16,
							lineHeight: 24,
							fontFamily: 'HelveticaReg',
							color: '#2a2a2a',
							opacity: 0.7
						}}
					>
						A brand new platform for equity crowdfunding, so that you can build
						your platform, and we handle the funding.
					</Text>
				</View>

				<View
					style={[
						{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}
					]}
				>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Login')
						}}
						style={[
							global.whiteBtn,
							{ backgroundColor: '#0AD98D', width: '83%', marginTop: 35 }
						]}
					>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							{/* <Image
								style={{ height: 25, width: 25 }}
								source={require('../assets/spotlogo.png')}
							/> */}
							<Text
								style={{
									fontSize: 20,
									fontFamily: 'HelveticaBold',
									// marginLeft: 15,
									color: '#fff'
								}}
							>
								Get started
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	)
}
