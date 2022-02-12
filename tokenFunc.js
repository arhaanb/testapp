import * as SecureStore from 'expo-secure-store'

module.exports = {
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
	}
}
