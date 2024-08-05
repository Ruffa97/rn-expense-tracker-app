import { View, StyleSheet, Text } from "react-native"
import Input from "./Input"
import { useState } from "react"
import Button from "../UI/Button";
import { ExpenseItemData } from "../ExpensesOutput/ExpensesOutput";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/style";

export interface InputValues {
    ammount?: { value: string, isValid: boolean };
    date?: { value: string, isValid: boolean };
    description?: { value: string, isValid: boolean };
  }

interface ExpenseFormProps {
    submitButtonLevel: string
    onCancel?: () => void,
    onSubmit?: (expenseData: { description: string, ammount: number, date: Date }) => void
    defaultValue: ExpenseItemData
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ submitButtonLevel, onCancel, onSubmit, defaultValue }) => {
    const [inputs, setInputs] = useState<InputValues>({
        ammount: {
            value: defaultValue ? defaultValue.ammount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValue ? getFormattedDate(defaultValue.date) : '',
            isValid: true
        },
        description: {
            value: defaultValue ? defaultValue.description.toString() : '',
            isValid: true
        }
    })

    function inputChangeHandler(inputIdentifier: keyof InputValues, enteredValue: string) {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        })
    }

    function submitInputHandler() {
        const expenseData: { description: string, ammount: number, date: Date } = {
            ammount: +inputs.ammount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.ammount) && expenseData.ammount > 0
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
        const descriptionIsValid = expenseData.description.trim().length > 0

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((curInputs) => {
                return {
                    ammount: { value: curInputs.ammount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { value: curInputs.description.value, isValid: descriptionIsValid }
                }
            }) 
            return
        }

        onSubmit(expenseData)
    }

    const formIsInvalid = 
        !inputs.ammount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    style={styles.rowInput}
                    invalid={!inputs.ammount.isValid}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangeHandler.bind(this, 'ammount'),
                        value: inputs.ammount.value
                    }} 
                />
                <Input 
                    label="Date" 
                    style={styles.rowInput}
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLenght: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }} 
                />
            </View>
            <Input 
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputs.description.value
                }}
            />
            {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
            <View style={styles.buttonsContainer}>
                <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitInputHandler}>{submitButtonLevel}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    }
})