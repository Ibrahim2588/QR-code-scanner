import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { CodeScanner } from './src/components/CodeScanner'

export default function App() {
    return (
        <View style={style.container}>
            <CodeScanner />
            <StatusBar style='auto' />
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
})
