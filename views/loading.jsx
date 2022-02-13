import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native'

export default function App({
	activityNav,
	style,
	innerStyle,
	loadText,
	showLongindicator
}) {
	return (
		<View style={[styles.container, style ? style : null]}>
			<ActivityIndicator
				size="large"
				color="lightgreen"
				style={innerStyle ? innerStyle : null}
			/>
			<Text style={[styles.text, { color: '#222' }]}>
				{loadText || 'Just a sec'}
			</Text>
			{showLongindicator ? (
				<TouchableOpacity onPress={activityNav}>
					<Text
						style={[
							styles.text,
							{
								opacity: 0.5,
								marginTop: 0,
								fontSize: 12,
								color: '#222'
							}
						]}
					>
						Taking too long?
					</Text>
				</TouchableOpacity>
			) : null}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
