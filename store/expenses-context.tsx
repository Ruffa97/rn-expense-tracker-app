import { createContext, ReactNode, useReducer, useState } from "react";
import { ExpenseItemData } from "../components/ExpensesOutput/ExpensesOutput";

export const DUMMY_EXPENSES: ExpenseItemData[] = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        ammount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        ammount: 89.29,
        date: new Date('2021-01-05')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        ammount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e4',
        description: 'A book',
        ammount: 14.99,
        date: new Date('2021-02-19')
    },
    {
        id: 'e5',
        description: 'Another book',
        ammount: 18.59,
        date: new Date('2022-02-18')
    }
]

interface ExpensesContextType {
    expenses: ExpenseItemData[],
    addExpense: (data: { description?: string, ammount?: number, date?: Date }) => void
    deleteExpense: (id: string) => void
    updateExpense: (id: string, data: { description?: string, ammount?: number, date?: Date }) => void
}

export const ExpensesContext = createContext<ExpensesContextType>({
    expenses: [],
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
  | { type: 'DELETE'; payload: string };

function expensesReducer(state: ExpenseItemData[], action: ActionType) {
    switch (action.type) {
        case "ADD":
            const newExpense: ExpenseItemData = {
                ...action.payload,
                id: new Date().toISOString() + Math.random().toString()
              };
              return [newExpense, ...state];
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
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

    function addExpense(data: { description: string, ammount: number, date: Date }) {
        dispatch({ type: 'ADD', payload: data })
    }

    function deleteExpense(id: string) { 
        dispatch({ type: 'DELETE', payload: id })
    }

    function updateExpense(id: string, expenseData: ExpenseItemData) { 
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData }})
    }

    const value: ExpensesContextType = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider