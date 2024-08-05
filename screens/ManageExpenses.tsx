import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View, StyleSheet, TextInput } from 'react-native'

import { RootParamList } from '../App'
import { useContext, useLayoutEffect, useState } from 'react'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/style'
import Button from '../components/UI/Button'
import { ExpensesContext } from '../store/expenses-context'
import ExpenseForm, { InputValues } from '../components/ManageExpense/ExpenseForm'
import { deleteExpense, storeExpense, updatedExpenses } from '../utils/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

type ManageExpensesProps = NativeStackScreenProps<RootParamList, 'ManageExpense'>

const ManageExpenses: React.FC<ManageExpensesProps> = ({ route, navigation }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string>()

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

    async function deleteExpenseHandler() {
        setIsSubmitting(true)
        try {
            await deleteExpense(editedExpenseId)
            expenseCtx.deleteExpense(editedExpenseId)
            navigation.goBack()
        } catch(error) {
            setError('could not delete expense - please try again later!')
            setIsSubmitting(false)
        }

    }

    function cancelHandler() {
        navigation.goBack()
    }

    async function confirmHandler(expenseData: { description: string, ammount: number, date: Date }) {
        setIsSubmitting(true)
        try {
            if (isEditing) {
                expenseCtx.updateExpense(editedExpenseId, expenseData)
                await updatedExpenses(editedExpenseId, expenseData)
            } else {
                const id = await storeExpense(expenseData)
                expenseCtx.addExpense({...expenseData, id: id})
            }
            navigation.goBack()
        } catch(error) {
            setError('Could not save data - please try again later!')
            setIsSubmitting(false)
        }  
    }
    
    function errorHandler() {
        setError(null)
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />
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