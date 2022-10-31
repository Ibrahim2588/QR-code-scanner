import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addHistoriqueElement } from '../store/slices/historique.slice'

export const useHistorique = () => {
    const [isFine, setIsFine] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        async function getHistorique() {
            try {
                const _keys = await AsyncStorage.getAllKeys()

                _keys.sort()

                _keys.map(async (key) => {
                    try {
                        const _value = await AsyncStorage.getItem(key)
                        const obj = {
                            key,
                            value: _value,
                        }
                        dispatch(addHistoriqueElement(obj))
                    } catch (e) {
                        console.log(e)
                    }
                })
            } catch (error) {
                console.log('useHistorique error', error)
            } finally {
                setIsFine(true)
            }
        }

        getHistorique()
    }, [])

    return {
        isFine,
    }
}
