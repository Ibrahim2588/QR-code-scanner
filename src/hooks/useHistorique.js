import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import { useDisclose } from 'native-base'
import { useEffect, useReducer } from 'react'

function reducer(state, action) {
    switch (action.type) {
        case 'ADDITEM':
            return [...state, action.payload]

        case 'RESET':
            return []
    }
}

export const useHistorique = () => {
    const [items, dispatch] = useReducer(reducer, [])
    const { isOpen, onOpen, onClose } = useDisclose(true)
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            ;(async function () {
                onOpen()
                dispatch({ type: 'RESET' })
                const _keys = await AsyncStorage.getAllKeys()

                _keys.sort().reverse()

                _keys.map(async (key) => {
                    const _value = await AsyncStorage.getItem(key)
                    const obj = {
                        key,
                        value: _value,
                    }
                    dispatch({ type: 'ADDITEM', payload: obj })
                })
            })()
        }
        onClose()
    }, [isFocused])

    return {
        items,
        isLoading: isOpen,
    }
}
