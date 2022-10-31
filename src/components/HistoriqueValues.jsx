import React, { useCallback } from 'react'
import {
    HStack,
    IconButton,
    ScrollView,
    Text,
    useToast,
    View,
    VStack,
} from 'native-base'
import { formatDate } from '../utils/format-date'
import { Ionicons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import { useSelector } from 'react-redux'

export const HistoriqueValues = React.memo(() => {
    const items = useSelector((state) => state.historique)

    const toast = useToast()

    const copy = useCallback(async (value) => {
        await Clipboard.setStringAsync(value)
        toast.show({ duration: 3000, description: 'copier' })
    }, [])

    return (
        <ScrollView>
            {items.map((item, index) => {
                let date = formatDate(parseInt(item.key))

                return (
                    <VStack
                        key={index}
                        borderBottomWidth='1'
                        minHeight='12'
                        justifyContent='flex-start'
                        alignItems='flex-end'
                        paddingX='2'
                    >
                        <View>
                            <Text fontSize='xs'>
                                {`${date.date}  ${date.time}`}
                            </Text>
                        </View>
                        <HStack
                            alignItems='center'
                            justifyContent='space-between'
                            width='full'
                            paddingBottom='1.5'
                        >
                            <Text noOfLines={2}>{item.value}</Text>
                            <IconButton
                                colorScheme='green'
                                // variant='outline'
                                onPress={(event) => {
                                    event.preventDefault()
                                    copy(item.value)
                                }}
                                icon={
                                    <Ionicons name='copy-outline' size={16} />
                                }
                            />
                        </HStack>
                    </VStack>
                )
            })}
        </ScrollView>
    )
})
