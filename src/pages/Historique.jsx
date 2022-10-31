import { Text, View } from 'native-base'
import { HistoriqueValues } from '../components/HistoriqueValues'

// const StackNav = createNativeStackNavigator()

export const Historique = () => {
    return (
        <View>
            <HistoriqueValues />
        </View>
        // <StackNav.Navigator
        //     initialRouteName='index'
        //     screenOptions={{
        //         headerShown: false,
        //     }}
        // >
        //     <StackNav.Screen name='index' component={Index} />
        //     {/* <StackNav.Screen name='value' component={} */}
        // </StackNav.Navigator>
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
