import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeToken(token) {
  try {
    await AsyncStorage.setItem('authToken', token);
    console.log("hi"+token)
  } catch (error) {
    console.error('Error storing token: ', error);
  }
}

// Retrieving the token
export async function retrieveToken() {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Error retrieving token: ', error);
  }
}
export async function deleteToken() {
    try {
      await AsyncStorage.removeItem('authToken');
      console.log('Token deleted');
    } catch (error) {
      console.error('Error deleting token: ', error);
    }
  }