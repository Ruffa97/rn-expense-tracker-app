import { ActivityIndicator, View, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/style"

const FunctionOverlay: React.FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='white'/>
        </View>
    )
}

export default FunctionOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})