import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 35,
		marginTop: 20,
		backgroundColor: '#fff'
	},
	onboardcontainer: {
		marginHorizontal: 55
	},
	scrollcontainer: {
		marginHorizontal: 25,
		marginTop: Platform.OS === 'android' ? 20 : 0,
		backgroundColor: '#fff',
		paddingBottom: 40,
		paddingTop: 20
	},
	whiteBtn: {
		backgroundColor: '#2C856B',
		paddingHorizontal: 10,
		paddingVertical: 18,
		borderRadius: 15,
		shadowColor: '#D4D4D4',
		shadowOffset: {
			width: 0,
			height: 200
		},
		shadowOpacity: 0.1,
		shadowRadius: 200,
		elevation: 15
	}
})

export default styles
