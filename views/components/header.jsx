import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export default function App({ style, navigation }) {
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
							uri: 'https://arhaanbahadur.co/me.jpeg'
						}}
					/>
				</TouchableOpacity>
			</View>
		</View>
	)
}
