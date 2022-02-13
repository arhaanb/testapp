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
							// borderColor: 'green',
							// borderWidth: 1
						}}
					>
						{tagline ? tagline : 'Company Tagline'}
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
						{goal?.goal
							? `$${goal?.goal
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
							: 'n/a'}
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
						{goal?.percentage ? `${goal?.percentage}%` : '0%'}
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

			{page == 'discover' ? (
				<View>
					{/* <Text>yo</Text> */}
					{mainlink ? (
						<TouchableOpacity
							onPress={() => Linking.openURL(mainlink)}
							style={{
								paddingVertical: 15,
								paddingHorizontal: 20,
								backgroundColor: '#eaeaea',
								borderRadius: 7.5,
								marginTop: 12.5,
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<Text
								style={{
									fontSize: 14,
									fontFamily: 'HelveticaReg',
									color: '#222'
								}}
							>
								Website
							</Text>
							<Text
								style={{
									fontSize: 14,
									fontFamily: 'HelveticaReg',
									color: '#222',
									marginRight: 10
								}}
							>
								&rarr;
							</Text>
						</TouchableOpacity>
					) : null}
				</View>
			) : null}
		</View>
	)
}
