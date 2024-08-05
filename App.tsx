import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' 
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/style'
import { Ionicons } from '@expo/vector-icons'
import IconButton from './components/UI/IconButton';

import React from 'react';
import ExpensesContextProvider from './store/expenses-context';

export type RootParamList = {
  ExpensesOverview: undefined,
  AllExpenses: undefined,
  ManageExpense: { expenseId: string },
  RecentExpenses: undefined,
}

const Stack = createNativeStackNavigator<RootParamList>()
const BottomTabs = createBottomTabNavigator<RootParamList>()

function ExpensesOverview() {
  return <BottomTabs.Navigator 
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => (
        <IconButton 
          icon="add" 
          size={24} 
          color={tintColor} 
          onPress={() => {
            navigation.navigate('ManageExpense')
          }}
        />
      )
    })}
  >
    <BottomTabs.Screen 
      name="RecentExpenses" 
      component={RecentExpenses} 
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({color, size}) => <Ionicons name='hourglass' size={size} color={color} />
      }}
    />
    <BottomTabs.Screen 
      name="AllExpenses" 
      component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All',
        tabBarIcon: ({color, size}) => <Ionicons name='calendar' size={size} color={color} />
      }}
    />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: 'white'
          }}>
            <Stack.Screen 
              name='ExpensesOverview' 
              component={ExpensesOverview} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name='ManageExpense' 
              component={ManageExpenses}
              options={{
                presentation: 'modal'
              }}
            /> 
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

