import React, { useEffect, useState } from 'react'
import { BarCodeScanner, usePermissions } from 'expo-barcode-scanner'
import { Button, StyleSheet, Text, Vibration, View } from 'react-native'
import { ValueModal } from './ValueModal'
import { useHistorique } from '../hooks/useHistorique'
import { setData } from '../utils/set-data-on-async-storage'
import { Historique } from './Historique'

export const CodeScanner = () => {
    const [hasPermissions, setHasPermissions] = useState(false)
    const [onScanned, setOnScanned] = useState(false)
    const [perm, getPermission] = usePermissions()
    const [value, setValue] = useState(null)

    const { values, getKeys, addKey } = useHistorique()

    const scanPermission = () =>
        (async function () {
            const { granted, status, expires } = await getPermission()
            if (granted) {
                setHasPermissions(true)
                setOnScanned(false)
            }
        })()

    useEffect(() => {
        scanPermission()
    }, [])

    const handleScanne = ({ type, data, bounds, target }) => {
        Vibration.vibrate()
        setValue(data)

        let date = new Date().getTime()

        setData(date, data)

        setOnScanned(true)

        getKeys()
    }

    useEffect(() => {
        console.log(onScanned)
    }, [onScanned])

    if (!hasPermissions) {
        return (
            <View style={style.container}>
                <Text>Permission is required for scanning</Text>
                <Button onPress={scanPermission} title='Set Permission' />
            </View>
        )
    }

    return (
        <View style={style.container}>
            <View style={style.barCodeBox}>
                <BarCodeScanner
                    // barCodeTypes={['QR']}
                    onBarCodeScanned={onScanned ? undefined : handleScanne}
                    style={{ width: 600, height: 600 }}
                />
            </View>
            <View style={style.buttonGroup}>
                {/* <Button
                    onPress={(event) =>
                        navigation.navigate('historique', {
                            values: values,
                        })
                    }
                    title='historique'
                /> */}
            </View>
            <ValueModal
                value={value}
                onScanned={onScanned}
                setOnScanned={setOnScanned}
            />
            <Historique values={values} setOnScanned={setOnScanned} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barCodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 30,
        width: 250,
        height: 250,
    },
    buttonGroup: {
        flex: 0,
        width: 200,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
})
