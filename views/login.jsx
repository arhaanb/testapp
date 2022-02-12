import React, { useEffect } from 'react'
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	TextInput
} from 'react-native'
import global from '../styles'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { getToken, saveToken, deleteTokens } from '../tokenFunc'

export default function App({ route, navigation }) {
	const isFocused = useIsFocused()
	const [username, onChangeUsername] = React.useState('')
	const [password, onChangePassword] = React.useState('')
	const [validate, setValidate] = React.useState(false)
	const [credErr, setCredErr] = React.useState(false)

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
		<ScrollView>
			<View
				style={{
					position: 'relative',
					paddingVertical: hp('100%') >= 750 ? hp('12%') : hp('7%')
				}}
			>
				<View style={global.container}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Home')
						}}
					>
						<Text
							style={{
								fontSize: wp('5%'),
								fontFamily: 'HelveticaBold',
								marginBottom: 10,
								opacity: 0.7
							}}
						>
							&larr;
						</Text>
					</TouchableOpacity>
					<Text
						style={{
							fontSize: wp('7.5%'),
							fontFamily: 'HelveticaBold',
							marginBottom: 3,
							lineHeight: 42
						}}
					>
						Login
					</Text>

					<Text
						style={{
							fontSize: 16,
							lineHeight: 24,
							fontFamily: 'HelveticaReg',
							color: '#2a2a2a',
							opacity: 0.7
						}}
					>
						Login with your credentials.
					</Text>

					<TextInput
						style={{
							marginTop: 25,
							borderColor: '#777',
							borderRadius: 7,
							fontSize: 18,
							lineHeight: 24,
							fontFamily: 'HelveticaReg',
							color: '#222',
							borderWidth: 1,
							paddingHorizontal: 15,
							paddingVertical: 15
						}}
						placeholder="Username"
						onChangeText={onChangeUsername}
						value={username}
						autoCorrect={false}
						autoComplete={'username'}
					/>
					<TextInput
						style={{
							marginTop: 15,
							borderColor: '#777',
							borderRadius: 7,
							fontSize: 18,
							lineHeight: 24,
							fontFamily: 'HelveticaReg',
							color: '#222',
							borderWidth: 1,
							paddingHorizontal: 15,
							paddingVertical: 15
						}}
						autoComplete={'password'}
						onChangeText={onChangePassword}
						value={password}
						secureTextEntry={true}
						textContentType={'password'}
						placeholder="Password"
						autoCorrect={false}
					/>
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
					{validate ? (
						<Text
							style={{
								fontSize: 16,
								fontFamily: 'HelveticaReg',
								color: '#eb5e54',
								marginTop: 10
							}}
						>
							Fields are required
						</Text>
					) : credErr ? (
						<Text
							style={{
								fontSize: 16,
								fontFamily: 'HelveticaReg',
								color: '#eb5e54',
								marginTop: 10
							}}
						>
							Invalid credentials
						</Text>
					) : (
						<Text
							style={{
								fontSize: 16,
								fontFamily: 'HelveticaReg',
								color: '#eb5e54',
								marginTop: 10
							}}
						>
							&nbsp;
						</Text>
					)}
					<TouchableOpacity
						onPress={() => {
							if (username?.length <= 0 || password.length <= 0) {
								setValidate(true)
							} else {
								setCredErr(false)
								setValidate(false)
								axios
									.post(
										'https://untitledarhnhack.herokuapp.com/api/auth/signin',
										{
											username,
											password
										}
									)
									.then((res) => {
										console.log(res.data)
										saveToken('accessToken', res.data.accessToken)
										navigation.navigate('Profile')
									})
									.catch((err) => {
										console.log(err.message)
										setCredErr(true)
										deleteTokens()
									})
							}
						}}
						style={[
							global.whiteBtn,
							{ backgroundColor: '#0AD98D', width: '83%', marginTop: 20 }
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
							<Text
								style={{
									fontSize: 20,
									fontFamily: 'HelveticaBold',
									color: '#fff'
								}}
							>
								Login
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	)
}
