import {SafeAreaView, StyleSheet} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Discover from "@/app/(component)/discover";

export default function DiscoverScreen() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Discover/>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
})