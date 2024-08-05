import { createContext, ReactNode, useReducer, useState } from "react";
import { ExpenseItemData } from "../components/ExpensesOutput/ExpensesOutput";

interface ExpensesContextType {
    expenses: ExpenseItemData[],
    setExpenses: (expenses: ExpenseItemData[]) => void
    addExpense: (data: ExpenseItemData) => void
    deleteExpense: (id: string) => void
    updateExpense: (id: string, data: { description?: string, ammount?: number, date?: Date }) => void
}

export const ExpensesContext = createContext<ExpensesContextType>({
    expenses: [],
    setExpenses: (data: ExpenseItemData[]) => {},
    addExpense: (data: { description: string, ammount: number, date: Date }) => {},
    deleteExpense: (id: string) => {},
    updateExpense: (id: string, data: { description: string, ammount: number, date: Date }) => {}
})

interface ExpensesContextProviderProps {
    children: ReactNode
}

type ActionType = 
  | { type: 'ADD'; payload: { description: string, ammount: number, date: Date } }
  | { type: 'UPDATE'; payload: { id: string; data: { description: string, ammount: number, date: Date } } }
  | { type: 'DELETE'; payload: string }
  | { type: 'SET'; payload: ExpenseItemData[] };

function expensesReducer(state: ExpenseItemData[], action: ActionType) {
    switch (action.type) {
        case "ADD":
            const newExpense: ExpenseItemData = {
                ...action.payload,
                id: new Date().toISOString() + Math.random().toString()
              };
              return [newExpense, ...state];
        case "SET":
            const reversed = action.payload.reverse()
            return reversed
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            )
            const updatableExpense = state[updatableExpenseIndex]
            const updatedItem = { ...updatableExpense, ...action.payload.data }
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updatedItem
            return updatedExpenses
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload)
            default:
                return state
    }
}

const ExpensesContextProvider: React.FC<ExpensesContextProviderProps> = ({ children }) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, [])

    function addExpense(data: { description: string, ammount: number, date: Date }) {
        dispatch({ type: 'ADD', payload: data })
    }

    function setExpenses(expenses: ExpenseItemData[]) {
        dispatch({ type: 'SET', payload: expenses})
    }

    function deleteExpense(id: string) { 
        dispatch({ type: 'DELETE', payload: id })
    }

    function updateExpense(id: string, expenseData: ExpenseItemData) { 
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData }})
    }

    const value: ExpensesContextType = {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider