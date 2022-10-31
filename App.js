import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import { Index } from './src'
import { store } from './src/store/store'

export default function App() {
    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <NavigationContainer>
                    <Index />
                    <StatusBar style='auto' />
                </NavigationContainer>
            </NativeBaseProvider>
        </Provider>
    )
}
