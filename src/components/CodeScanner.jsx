import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Vibration } from 'react-native'
import { ValueModal } from './ValueModal'
import { Box, Button, Text, View } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'

export const CodeScanner = React.memo(() => {
    const [hasPermission, setHasPermission] = useState(false)
    const [onScanned, setOnScanned] = useState(false)
    const [value, setValue] = useState(null)

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

    const saveData = async (value) => {
        let date = new Date().getTime()
        try {
            await AsyncStorage.setItem(JSON.stringify(date), value)
            console.info('AsyncStorage save with succes')
        } catch (error) {
            console.log(error)
        }
    }

    const handleScanne = ({ data }) => {
        saveData(data)
            .then(() => {
                setOnScanned(true)
                Vibration.vibrate()
                setValue(data)
            })
            .catch((error) => {
                console.log('save error', error)
            })
    }

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
