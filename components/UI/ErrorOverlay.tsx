import { View, Text, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/style"
import Button from "./Button"

interface ErrorOverlayProps {
    message: string,
    onConfirm: () => void
}

const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ message, onConfirm }) => {
    return (
        <View>
            <Text style={[styles.text, styles.title]}>An error ocurred!</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
})