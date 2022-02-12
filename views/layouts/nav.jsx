import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export default function Layout({ children, active, navigation }) {
	return (
		<View style={{ flex: 1 }}>
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
