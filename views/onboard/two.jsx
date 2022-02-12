import React, { useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import global from '../../styles'
import { getToken } from '../../tokenFunc'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { useIsFocused } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import AutoHeightImage from 'react-native-auto-height-image'
import Onboard from '../../assets/onboard/2.png'

export default function App({ route, navigation }) {
	const isFocused = useIsFocused()

	useEffect(() => {
		getInitialData()
	}, [isFocused])

	const getInitialData = async () => {
		await getToken('accessToken').then((token) => {
			if (token?.length > 0) {
				navigation.navigate('Profile')
			}
		})
	}

	return (
		<ScrollView
			style={{
				backgroundColor: '#0AD98D'
			}}
		>
			<StatusBar style="dark" backgroundColor={'#0AD98D'} />
			<View style={{ position: 'absolute', top: 0 }}>
				<AutoHeightImage width={wp('100%')} source={Onboard} />
			</View>
			<View
				style={[
					global.onboardcontainer,
					{
						paddingTop: hp('100%') >= 750 ? hp('12%') : hp('7%'),
						height: hp('85%'),
						marginTop: 20
					}
				]}
			>
				<View style={{ position: 'absolute', bottom: hp('5%') }}>
					<Text
						style={{
							fontSize: 30,
							fontFamily: 'HelveticaBold',
							color: '#020827',
							marginBottom: 5
						}}
					>
						Invest big or small
					</Text>
					<Text
						style={{
							fontSize: 15,
							fontFamily: 'HelveticaReg',
							color: '#020827',
							lineHeight: 20.8
						}}
					>
						Payout makes it easier for you to find and invest in upcoming
						companies, that could be the next big thing.
					</Text>
				</View>
			</View>
			<View
				style={[
					global.onboardcontainer,
					{
						backgroundColor: '#0AD98D',
						position: 'relative',
						display: 'flex',
						alignItems: 'flex-end'
					}
				]}
			>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Three')
					}}
				>
					<Image
						style={{ height: 406.67 * 0.135, width: 610 * 0.135 }}
						source={require('../../assets/onboard/button.png')}
					/>
				</TouchableOpacity>
			</View>
		</ScrollView>
	)
}
