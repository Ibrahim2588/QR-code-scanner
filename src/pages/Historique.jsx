import { Text, View } from 'native-base'
import { HistoriqueValues } from '../components/HistoriqueValues'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const StackNav = createNativeStackNavigator()

export const Historique = () => {
    return (
        <StackNav.Navigator
            initialRouteName='index'
            screenOptions={{
                headerShown: false,
            }}
        >
            <StackNav.Screen name='index' component={Index} />
            {/* <StackNav.Screen name='value' component={} */}
        </StackNav.Navigator>
    )
}

const Index = () => {
    return (
        <View>
            <HistoriqueValues />
        </View>
    )
}

// const Value = () => {
//     const { params } = useRoute()

//     return <View></View>
// }
