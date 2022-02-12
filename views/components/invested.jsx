import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export default function App({ style }) {
	return (
		<View
			style={[
				style ? style : null,
				{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }
			]}
		>
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
						borderRadius: 7.5,
						marginRight: 10
					}}
					source={{
						uri: 'https://cdn-images-1.medium.com/max/1600/1*SkFEBcaoea9WXIdQg2GsTw.png'
					}}
				/>
				<View>
					<Text
						style={{
							fontSize: 17,
							fontFamily: 'HelveticaBold',
							color: '#222'
						}}
					>
						Delhi Design Foundry
					</Text>
					<Text
						style={{
							fontSize: 12,
							fontFamily: 'HelveticaBold',
							color: '#222',
							opacity: 0.5
						}}
					>
						Invested on 06/02/2022
					</Text>
				</View>
			</View>

			<View
				style={{
					marginTop: 20,
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center'
				}}
			>
				<View style={{ width: wp('45%') - 70 }}>
					<Text
						style={{
							fontSize: 26,
							fontFamily: 'HelveticaBold',
							color: '#00EC96',
							marginBottom: 2.55,
							opacity: 0.5
						}}
					>
						$40,000
					</Text>
					<Text
						style={{
							fontSize: 12,
							fontFamily: 'HelveticaBold',
							color: '#222',
							opacity: 0.5
						}}
					>
						invested
					</Text>
				</View>
				<View
					style={{
						height: 30,
						width: 1,
						backgroundColor: '#222',
						marginHorizontal: 25
					}}
				/>
				<View style={{ width: wp('45%') - 70 }}>
					<Text
						style={{
							fontSize: 26,
							fontFamily: 'HelveticaBold',
							color: '#00EC96',
							marginBottom: 2.55,
							opacity: 0.5
						}}
					>
						10%
					</Text>
					<Text
						style={{
							fontSize: 12,
							fontFamily: 'HelveticaBold',
							color: '#222',
							opacity: 0.5
						}}
					>
						equity
					</Text>
				</View>
			</View>
		</View>
	)
}
