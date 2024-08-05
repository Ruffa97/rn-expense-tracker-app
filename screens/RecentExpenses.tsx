import { Text } from 'react-native'
import ExpensesOutput, { ExpenseItemData } from '../components/ExpensesOutput/ExpensesOutput'
import { useContext, useEffect, useState } from 'react'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../utils/date'
import { fetchExpenses } from '../utils/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

const RecentExpenses: React.FC = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<string>()

    const expensesCtx = useContext(ExpensesContext)

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true)
            try {
                const expenses = await fetchExpenses()
                expensesCtx.setExpenses(expenses)
            } catch(error) {
                setError('Could not fetch expenses!')
            }
            setIsFetching(false)
        }

        getExpenses()
    }, [])

    function errorHandler() {
        setError(null)
    }

    if (error && isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }


    const recentExpenses = expensesCtx.expenses.filter((expense) => {
            const today = new Date()
            const date7DaysAgo = getDateMinusDays(today, 7)

            return (expense.date > date7DaysAgo) && (expense.date < today)
        }
    )

    return (
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod='Last 7 Days' 
            fallbackText='No expenses registered for the las 7 days.'
        />
    )
}

export default RecentExpenses