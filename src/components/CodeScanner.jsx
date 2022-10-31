import React, { useCallback, useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Linking, Vibration } from 'react-native'
import { ValueModal } from './ValueModal'
import { Box, Button, Text, View } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import { isUrl } from '../utils/is-url'

import { useDispatch } from 'react-redux'
import { addHistoriqueElement } from '../store/slices/historique.slice'

export const CodeScanner = React.memo(() => {
    const [hasPermission, setHasPermission] = useState(false)
    const [onScanned, setOnScanned] = useState(false)
    const [value, setValue] = useState(null)

    const dispatch = useDispatch()

    const isFocused = useIsFocused()

    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        setHasPermission(status === 'granted')
    }

    useEffect(() => {
        ;(async function () {
            await getBarCodeScannerPermissions()
        })()
    }, [])

    const saveData = useCallback(async (value) => {
        let date = new Date().getTime()
        try {
            await AsyncStorage.setItem(JSON.stringify(date), value)
            dispatch(addHistoriqueElement({ key: date, value }))
            console.info('AsyncStorage save with succes')
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleScanne = useCallback(({ data }) => {
        saveData(data)
            .then(() => {
                setOnScanned(true)
                Vibration.vibrate()
                setValue(data)
            })
            .then(() => {
                if (isUrl(data)) {
                    Linking.openURL(data)
                }
            })
            .catch((error) => {
                console.log('save error', error)
            })
    }, [])

    if (!hasPermission) {
        return (
            <View margin='auto'>
                <Text>
                    QR-Scanner à besoin de l'accès a l'appareil photo pour
                    fonstionner
                </Text>
                <Button onPress={() => getBarCodeScannerPermissions()}>
                    Accorder la permission
                </Button>
            </View>
        )
    }

    return (
        <View>
            <Box
                justifyContent='center'
                alignItems='center'
                borderRadius='xl'
                borderWidth='1'
                overflow='hidden'
                width='56'
                height='56'
            >
                <Text>sssssss</Text>
                {isFocused ? (
                    <BarCodeScanner
                        // barCodeTypes={['QR']}
                        onBarCodeScanned={onScanned ? undefined : handleScanne}
                        style={{ width: 500, height: 500 }}
                    />
                ) : null}
            </Box>
            <ValueModal
                value={value}
                onScanned={onScanned}
                setOnScanned={setOnScanned}
            />
        </View>
    )
})
