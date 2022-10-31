import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Historique } from './pages/Historique'
import { Scanner } from './pages/Scanner'

const TabNav = createBottomTabNavigator()

export const Index = () => {
    return (
        <TabNav.Navigator>
            <TabNav.Screen
                name='scanner'
                component={Scanner}
                options={{
                    title: 'Scanner',

                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name='qr-code' color={color} size={size} />
                    ),
                }}
            />
            <TabNav.Screen
                name='historique'
                component={Historique}
                options={{
                    title: 'Historique',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='archive' size={size} color={color} />
                    ),
                }}
            />
        </TabNav.Navigator>
    )
}
