import axios from "axios";
import { ExpenseItemData } from "../components/ExpensesOutput/ExpensesOutput";

const BACKEND_URL = 'https://rn-course-7720d-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData: { description: string, ammount: number, date: Date }) {
    const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData)
    const id = response.data.name
    return id
}

export async function fetchExpenses() {
    const response = await axios.get(BACKEND_URL + '/expenses.json')

    const expenses: ExpenseItemData[] = []

    for (const key in response.data) {
        const expenseObj: ExpenseItemData = {
            id: key,
            ammount: response.data[key].ammount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(expenseObj)
    }

    return expenses
}

export function updatedExpenses(id: string, expenseData: { description: string, ammount: number, date: Date }) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id: string) {
    return axios.delete(BACKEND_URL + `expenses/${id}.json`)
}

