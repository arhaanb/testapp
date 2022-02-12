import * as SecureStore from 'expo-secure-store'

module.exports = {
	baseURL: 'https://dev.linkplusai.com',

	getToken: (key) => {
		if (!key) {
			return 'getToken(): No key was provided.'
		}
		return SecureStore.getItemAsync(key)
	},

	saveToken: async (key, value) => {
		await SecureStore.setItemAsync(key, value)
	},

	deleteTokens: async () => {
		await SecureStore.deleteItemAsync('accessToken')
	},

	timeSince(date) {
		var seconds = Math.floor((new Date() - date) / 1000)

		var interval = seconds / 86400
		if (interval > 1) {
			if (Math.floor(interval) == 1) {
				return Math.floor(interval) + ' day'
			} else {
				return Math.floor(interval) + ' days'
			}
		}
		interval = seconds / 3600
		if (interval > 1) {
			if (Math.floor(interval) == 1) {
				return Math.floor(interval) + ' hour'
			} else {
				return Math.floor(interval) + ' hours'
			}
		}
		interval = seconds / 60
		if (interval > 1) {
			return Math.floor(interval) + ' minutes'
		}
		return Math.floor(seconds) + ' seconds'
	},

	calcNowPlaying(str) {
		var arr = str.split(' ')

		if (arr[1] == 'minutes' || 'seconds') {
			if (arr[1] == 'minutes') {
				if (parseInt(arr[0]) < 11) {
					return 'playing'
				}
			} else if (arr[1] == 'seconds') {
				return 'playing'
			}
		}
		return str
	}
}
