import { Text } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useContext } from 'react'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../utils/date'

const RecentExpenses: React.FC = () => {
    const expensesCtx = useContext(ExpensesContext)

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
            const today = new Date()
            const date7DaysAgo = getDateMinusDays(today, 7)

            return (expense.date > date7DaysAgo) && (expense.date < today)
        }
    )

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 Days' fallbackText='No expenses registered for the las 7 days.'/>
    )
}

export default RecentExpenses