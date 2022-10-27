import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export const useHistorique = () => {
    const [keys, setKeys] = useState([])
    const [values, setValues] = useState([])

    const addKey = (key) => setKeys([...keys, key])
    const addValue = (value) => setValues([...values, value])

    const getKeys = () => {
        ;(async function () {
            try {
                let keys = await AsyncStorage.getAllKeys()
                setKeys(keys)
            } catch (error) {
                console.log('historique error', error)
            }
        })()
    }

    const getValues = () => {
        ;(async function () {
            keys.map(async (key) => {
                try {
                    addValue({
                        key: key,
                        value: await AsyncStorage.getItem(key),
                    })
                } catch (error) {
                    console.log('historique error', error)
                }
            })
        })()
    }

    useEffect(() => {
        getKeys()
    }, [])

    useEffect(() => {
        getValues()
    }, [keys])

    return {
        getKeys,
        values,
    }
}
