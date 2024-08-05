import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View, StyleSheet, TextInput } from 'react-native'

import { RootParamList } from '../App'
import { useContext, useLayoutEffect } from 'react'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/style'
import Button from '../components/UI/Button'
import { ExpensesContext } from '../store/expenses-context'
import ExpenseForm, { InputValues } from '../components/ManageExpense/ExpenseForm'

type ManageExpensesProps = NativeStackScreenProps<RootParamList, 'ManageExpense'>

const ManageExpenses: React.FC<ManageExpensesProps> = ({ route, navigation }) => {
    const expenseCtx = useContext(ExpensesContext)

    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const selectedExpense = expenseCtx.expenses.find(
        (expense) => expense.id == editedExpenseId
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add expense'
        })
    }, [navigation, isEditing])

    function deleteExpenseHandler() {
        expenseCtx.deleteExpense(editedExpenseId)
        navigation.goBack()
    }

    function cancelHandler() {
        navigation.goBack()
    }

    function confirmHandler(expenseData: { description: string, ammount: number, date: Date }) {
        if (isEditing) {
            expenseCtx.updateExpense(editedExpenseId, expenseData)
        } else {
            expenseCtx.addExpense(expenseData)
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ExpenseForm 
                submitButtonLevel={isEditing ? 'Update' : 'Add'}
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValue={selectedExpense}
            />
            {isEditing && 
            <View style={styles.deleteContainer}>
                <IconButton 
                    icon="trash" 
                    color={GlobalStyles.colors.error500} 
                    size={36} 
                    onPress={deleteExpenseHandler} 
                />
            </View>
        }
        </View>
    )
}

export default ManageExpenses

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})