import { SafeAreaView, Text, View } from "react-native";
import tailwind from "tailwind-rn";

export default function App() {
  return (
    <SafeAreaView style={tailwind("flex-1 items-center justify-center")}>
      <View style={tailwind("bg-blue-500 px-5 py-3 rounded-full")}>
        <Text style={tailwind("text-white font-semibold text-lg")}>
          Hello Tailwind 👋
        </Text>
        <Text
          style={tailwind(
            "whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700"
          )}
        >
          123
        </Text>
      </View>
    </SafeAreaView>
  );
}
