import { FlatList, ListRenderItemInfo, Text } from "react-native"

import { ExpenseItemData } from "./ExpensesOutput"
import ExpenseItem from "./ExpenseItem"

interface ExpensesListProps {
    expenses: ExpenseItemData[]
}

function renderExpenseItem(itemData: ListRenderItemInfo<ExpenseItemData>) {
    return <ExpenseItem {...itemData.item} />
}

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {
    return <FlatList 
        data={expenses} 
        renderItem={renderExpenseItem} 
        keyExtractor={(item) => item.id} 
    />
}

export default ExpensesList

