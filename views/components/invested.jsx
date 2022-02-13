import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import * as Linking from 'expo-linking'

export default function App({
	style,
	icon,
	name,
	tagline,
	page,
	//for invest card
	amt,
	equity,
	mainlink,
	goal
}) {
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
						height: 52.5,
						width: 52.5,
						borderRadius: 7.5,
						marginRight: 10
					}}
					source={{
						uri: icon
							? icon
							: 'https://cdn-images-1.medium.com/max/1600/1*SkFEBcaoea9WXIdQg2GsTw.png'
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
						{name ? name : 'Company Name'}
					</Text>
					<Text
						style={{
							fontSize: 12,
							fontFamily: 'HelveticaBold',
							color: '#222',
							opacity: 0.5,
							width: wp('75%') - 70,
							lineHeight: 16
						}}
					>
						{tagline ? tagline : 'Company Tagline'}
					</Text>
				</View>
			</View>

			{page == 'invested' ? (
				<View
					style={{
						marginTop: 20,
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'flex-start',
						alignItems: 'center'
					}}
				>
					<View style={{ width: wp('50%') - 70 }}>
						<Text
							style={{
								fontSize: 22,
								fontFamily: 'HelveticaBold',
								color: '#00EC96',
								marginBottom: 2.55,
								opacity: 0.5
							}}
						>
							{amt
								? `$${amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
								: '$0'}
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
								fontSize: 22,
								fontFamily: 'HelveticaBold',
								color: '#00EC96',
								marginBottom: 2.55,
								opacity: 0.5
							}}
						>
							{equity ? equity : 0}%
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
			) : (
				<View
					style={{
						marginTop: 20,
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'flex-start',
						alignItems: 'center'
					}}
				>
					<View style={{ width: wp('50%') - 70 }}>
						<Text
							style={{
								fontSize: 22,
								fontFamily: 'HelveticaBold',
								color: '#00EC96',
								marginBottom: 2.55,
								opacity: 0.5
							}}
						>
							{goal
								? `$${goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
								: 'n/a'}
							{/* $40,000 */}
						</Text>
						<Text
							style={{
								fontSize: 12,
								fontFamily: 'HelveticaBold',
								color: '#222',
								opacity: 0.5
							}}
						>
							funding goal
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
								fontSize: 22,
								fontFamily: 'HelveticaBold',
								color: '#00EC96',
								marginBottom: 2.55,
								opacity: 0.5
							}}
						>
							{equity ? equity : 0}%
						</Text>
						<Text
							style={{
								fontSize: 12,
								fontFamily: 'HelveticaBold',
								color: '#222',
								opacity: 0.5
							}}
						>
							of goal met
						</Text>
					</View>
				</View>
			)}
		</View>
	)
}
