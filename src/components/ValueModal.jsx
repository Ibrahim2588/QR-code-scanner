import React, { useCallback, useEffect } from 'react'
import { Button, Modal, Text, useDisclose, useToast } from 'native-base'
import { useIsFocused } from '@react-navigation/native'
import * as Clipboard from 'expo-clipboard'

export const ValueModal = React.memo(({ value, onScanned, setOnScanned }) => {
    const { isOpen, onOpen, onClose } = useDisclose()

    const toast = useToast()

    const isFocused = useIsFocused()
    const copyValue = useCallback(async () => {
        await Clipboard.setStringAsync(value)
        toast.show({ title: 'copier', duration: 3000 })
    }, [value])

    useEffect(() => {
        if (!isOpen) {
            setOnScanned(false)
        }
    }, [isOpen])

    useEffect(() => {
        if (onScanned & isFocused) {
            onOpen()
        }
    }, [onScanned])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content width='85%'>
                <Modal.CloseButton />
                <Modal.Header>Résultat du scan</Modal.Header>
                <Modal.Body>
                    <Text>{value}</Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        colorScheme='green'
                        variant='subtle'
                        onPress={() => copyValue()}
                    >
                        copier
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
})
