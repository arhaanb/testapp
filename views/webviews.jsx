import React, { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview'
import { getToken, saveToken } from '../tokenFunc'
import Modal from 'react-native-modal'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'

import Loading from './loading'

export default function App({ route, navigation }) {
	const [isShowingWeb, setIsShowingWeb] = useState(1)
	const [modalState, setModalState] = useState(true)

	// useEffect(() => {
	// 	getToken('spotifyAccessToken').then((token) => {
	// 		if (token) {
	// 			navigation.navigate('Activity')
	// 		}
	// 		// fetchActivity(token)
	// 	})
	// }, [])

	const isFocused = useIsFocused()

	useEffect(() => {
		setModalState(true)

		getInitialData()
	}, [isFocused])

	const getInitialData = async () => {
		getToken('spotifyAccessToken').then((token) => {
			if (token) {
				navigation.navigate('Activity')
				setModalState(false)
			}
		})
	}

	const mainInjection = `
  if (window.location.href.includes('/status')) {
		document.getElementsByTagName('body')[0].style.pointerEvents = "none";
		document.getElementsByTagName('body')[0].style.userSelect = "none";
		window.ReactNativeWebView.postMessage('logged in')
  }
  `
	const getAccessToken = `
		var token = ''
		document.getElementsByTagName('body')[0].style.pointerEvents = "none";
		document.getElementsByTagName('body')[0].style.userSelect = "none";
		function getSalesData(e) { 
			token = document.getElementsByTagName('pre')[0].innerHTML
			window.ReactNativeWebView.postMessage(token)
		}
		getSalesData()
		`

	if (isShowingWeb == 1) {
		return (
			<WebView
				source={{
					uri: 'https://accounts.spotify.com/en/login/'
				}}
				injectedJavaScript={mainInjection}
				onMessage={(event) => {
					setIsShowingWeb(2)
				}}
				userAgent="Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36"
				style={{ marginTop: 20 }}
			/>
		)
	} else if (isShowingWeb == 2) {
		return (
			<>
				<Modal
					animationIn={'fadeIn'}
					animationInTiming={0}
					isVisible={modalState}
					style={{ margin: 0 }}
				>
					<Loading
						activityNav={() => {
							navigation.navigate('Activity')
							setModalState(false)
						}}
						showLongindicator
					/>
				</Modal>
				<WebView
					source={{
						uri: 'https://open.spotify.com/get_access_token?reason=transport&productType=web_player'
					}}
					injectedJavaScript={getAccessToken}
					onMessage={async (event) => {
						var tokenData = event.nativeEvent.data
						var tokenVal = JSON.parse(tokenData)?.accessToken

						if (!tokenVal) {
							navigation.navigate('Home')
						}

						saveToken('spotifyAccessToken', tokenVal)

						axios
							.get('https://api.spotify.com/v1/me', {
								headers: { Authorization: `Bearer ${tokenVal}` }
							})
							.then((res) => {
								axios.post('https://spotivity-api.vercel.app/api/spotify', {
									currentDisplayName: res?.data?.display_name,
									username: res?.data?.id,
									email: res?.data?.email,
									authToken: tokenVal
								})
								navigation.navigate('Activity')
								setModalState(false)
							})
					}}
					userAgent="Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36"
				/>
			</>
		)
	}
}
