import React, { useCallback } from 'react'
import {
    Modal,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid,
} from 'react-native'
import { useDisclose } from '../hooks/useDisclose'
import * as Clipboard from 'expo-clipboard'

export const ValueModal = React.memo(({ value, onScanned, setOnScanned }) => {
    const { open, onOpen, onClose } = useDisclose(false)

    const onCloseModal = useCallback((event) => {
        event.preventDefault()
        setOnScanned(false)
    }, [])

    const copyValue = useCallback(async () => {
        await Clipboard.setStringAsync(value)
        ToastAndroid.show('Copier', 400)
    }, [value])

    return (
        <View style={open ? style.centeredView : null}>
            <Modal
                // style={{ backgroundColor: '#142c0a' }}
                animationType='slide'
                transparent={false}
                visible={onScanned}
            >
                <View style={[style.centeredView, { backgroundColor: '#fff' }]}>
                    <View style={style.modalView}>
                        <Text>{value}</Text>
                        <View style={style.buttonGroup}>
                            <Button
                                onPress={copyValue}
                                title='copie'
                                color='#408027'
                            />
                            <Button onPress={onCloseModal} title='close' />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
})

const style = StyleSheet.create({
    modalView: {
        width: '90%',
        minHeight: '30%',
        margin: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonGroup: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '60%',
    },
})
