import AsyncStorage from '@react-native-async-storage/async-storage'

export const setData = async (key, value) => {
    try {
        // const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(JSON.stringify(key), value)
    } catch (error) {
        console.log(error)
    }
}
