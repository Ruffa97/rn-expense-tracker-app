import { FlatList, View, Text, StyleSheet } from "react-native"
import { ExpenseItemData } from "./ExpensesOutput"
import { GlobalStyles } from "../../constants/style"

interface ExpensesSummaryProps {
    periodName: string
    expenses: ExpenseItemData[]
}

const ExpensesSummary: React.FC<ExpensesSummaryProps> = ({ expenses, periodName }) => {
    const expensesSum: number = expenses.reduce((sum, expenses) => {
        return sum + expenses.ammount
    }, 0)

    return <View style={styles.container}>
        <Text style={styles.period}>{periodName}</Text>
        <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
}

export default ExpensesSummary

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500
    }
})