import { useEffect, useState } from 'react'
import {
    Button,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { formatDate } from '../utils/format-date'

export const Historique = ({ values, setOnScanned }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        console.log(values)
    }, [values])

    const onOpenModal = (event) => {
        event.preventDefault()

        setVisible(true)
        setOnScanned(true)
    }

    const onCloseModal = (event) => {
        event.preventDefault()

        setVisible(false)
        setOnScanned(false)
    }

    return (
        <View>
            <Button onPress={onOpenModal} title='historique' />
            <Modal animationType='fade' transparent={false} visible={visible}>
                <ScrollView style={style.scrollView}>
                    {values.map(({ key, value }, index) => {
                        return (
                            <Pressable
                                key={index}
                                onPress={async () => {
                                    await Clipboard.setStringAsync(value)
                                    ToastAndroid.show('Copier', 400)
                                }}
                            >
                                <View style={style.item}>
                                    <View style={style.key}>
                                        <Text>
                                            {formatDate(parseInt(key)).date}
                                        </Text>
                                        <Text>
                                            {formatDate(parseInt(key)).time}
                                        </Text>
                                    </View>
                                    <Text>{value}</Text>
                                </View>
                            </Pressable>
                        )
                    })}
                </ScrollView>
                <Button onPress={onCloseModal} title='close' />
            </Modal>
        </View>
    )
}

const style = StyleSheet.create({
    item: {
        flexDirection: 'row',
        borderWidth: 1,
        // marginBottom: 2,
    },
    key: {
        width: '30%',
        borderRightWidth: 1,
        justifyContent: 'center',
    },
    scrollView: {
        // padding: 10,
    },
})
