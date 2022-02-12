// import React from 'react'

// const Layout = ({ children }) => {
// 	return (
// 		<>
// 			<div>
// 				<ToolBar />
// 				<Sides />
// 				<Backdrop />
// 			</div>
// 			<main>{children}</main>
// 		</>
// 	)
// }

// export default Layout

import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Image
} from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export default function Layout({ children, active, navigation }) {
	return (
		<View style={{ flex: 1 }}>
			{/* <Text>Hello</Text> */}
			<View style={{ flex: 1 }}>{children}</View>
			<View
				style={{
					backgroundColor: '#fff',
					marginHorizontal: 25,
					position: 'absolute',
					width: wp('100%') - 50,
					bottom: 20,
					paddingVertical: 10,
					paddingHorizontal: 10,
					borderRadius: 100,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
					alignItems: 'center'
					// marginBottom: 20
					// margin: 35
					// marginBottom: 20
				}}
			>
				<TouchableOpacity onPress={() => navigation.navigate('Discover')}>
					<Image
						style={{
							height: 40,
							width: 40
						}}
						source={
							active == 'discover'
								? require('../../assets/icons/discoverf.png')
								: require('../../assets/icons/discover.png')
						}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
					<Image
						style={{
							height: 40,
							width: 40
						}}
						source={
							active == 'profile'
								? require('../../assets/icons/homef.png')
								: require('../../assets/icons/home.png')
						}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate('Chat')}>
					<Image
						style={{
							height: 40,
							width: 40
						}}
						source={
							active == 'chat'
								? require('../../assets/icons/chatf.png')
								: require('../../assets/icons/chat.png')
						}
					/>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontFamily: 'HelveticaReg',
		width: '45%',
		textAlign: 'center',
		fontSize: 15,
		lineHeight: 21,
		marginTop: 20
	}
})
