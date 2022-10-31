import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { Index } from './src'

export default function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Index />
                <StatusBar style='auto' />
            </NavigationContainer>
        </NativeBaseProvider>
    )
}
