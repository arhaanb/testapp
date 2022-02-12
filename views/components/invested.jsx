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

export default function App({
	activityNav,
	style,
	innerStyle,
	loadText,
	showLongindicator,
	darkMode
}) {
	return (
		<View
			style={[
				// styles.container,
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
						// resizeMode: 'contain',
						// marginBottom: 5,
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
							// lineHeight: 23,
							fontFamily: 'HelveticaBold',
							color: '#222'
							// marginBottom: 30
						}}
					>
						Delhi Design Foundry
					</Text>
					<Text
						style={{
							fontSize: 12,
							// lineHeight: 23,
							fontFamily: 'HelveticaBold',
							color: '#222',
							// marginBottom: 30,
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
							// lineHeight: 23,
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
							// lineHeight: 23,
							fontFamily: 'HelveticaBold',
							color: '#222',
							// marginBottom: 30,
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
					{/* <View> */}
					<Text
						style={{
							fontSize: 26,
							// lineHeight: 23,
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
							// lineHeight: 23,
							fontFamily: 'HelveticaBold',
							color: '#222',
							// marginBottom: 30,
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
