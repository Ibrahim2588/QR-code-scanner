import { Ionicons } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Text } from 'native-base'
import { Historique } from './pages/Historique'
import { Scanner } from './pages/Scanner'

const DrawerNav = createDrawerNavigator()

export const Index = () => {
    return (
        <DrawerNav.Navigator
            initialRouteName='scanner'
            screenOptions={{
                drawerStyle: {
                    width: '70%',
                },
                drawerLabelStyle: {
                    fontSize: 18,
                },
                drawerType: 'slide',
            }}
        >
            <DrawerNav.Screen
                name='scanner'
                component={Scanner}
                options={{
                    title: 'Scanner',
                    drawerIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name='qr-code'
                            color={color}
                            size={size + 3}
                        />
                    ),
                }}
            />
            <DrawerNav.Screen
                name='historique'
                component={Historique}
                options={{
                    title: 'Historique',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name='archive' size={size} color={color} />
                    ),
                }}
            />
        </DrawerNav.Navigator>
    )
}
