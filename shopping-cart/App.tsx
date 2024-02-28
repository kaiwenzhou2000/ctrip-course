import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import { SvgXml } from "react-native-svg"; // Import the missing component
import tailwind from "tailwind-rn";

// Define the missing variable
const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

export default function App() {
  return (
    <SafeAreaView style={tailwind("flex-1 items-center justify-center")}>
      <View
        style={tailwind(
          "relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
        )}
      >
        <TouchableOpacity
          style={tailwind(
            "absolute end-4 top-4 text-gray-600 transition hover:scale-110"
          )}
        >
          <Text style={tailwind("sr-only")}>Close cart</Text>

          <SvgXml
            xml={closeIcon}
            width={20}
            height={20}
            style={tailwind("h-5 w-5")}
          />
        </TouchableOpacity>

        <View style={tailwind("mt-4 space-y-6")}>
          <ScrollView style={tailwind("space-y-4")}>
            <View style={tailwind("flex items-center gap-4")}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
                }}
                style={tailwind("size-16 rounded object-cover")}
              />

              <View>
                <Text style={tailwind("text-sm text-gray-900")}>
                  Basic Tee 6-Pack
                </Text>

                <View
                  style={tailwind(
                    "mt-0.5 space-y-px text-[10px] text-gray-600"
                  )}
                >
                  <View style={tailwind("flex flex-row")}>
                    <Text style={tailwind("inline")}>Size:</Text>
                    <Text style={tailwind("inline")}>XXS</Text>
                  </View>

                  <View style={tailwind("flex flex-row")}>
                    <Text style={tailwind("inline")}>Color:</Text>
                    <Text style={tailwind("inline")}>White</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={tailwind("flex items-center gap-4")}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
                }}
                style={tailwind("size-16 rounded object-cover")}
              />

              <View>
                <Text style={tailwind("text-sm text-gray-900")}>
                  Basic Tee 6-Pack
                </Text>

                <View
                  style={tailwind(
                    "mt-0.5 space-y-px text-[10px] text-gray-600"
                  )}
                >
                  <View style={tailwind("flex flex-row")}>
                    <Text style={tailwind("inline")}>Size:</Text>
                    <Text style={tailwind("inline")}>XXS</Text>
                  </View>

                  <View style={tailwind("flex flex-row")}>
                    <Text style={tailwind("inline")}>Color:</Text>
                    <Text style={tailwind("inline")}>White</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={tailwind("flex items-center gap-4")}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
                }}
                style={tailwind("size-16 rounded object-cover")}
              />

              <View>
                <Text style={tailwind("text-sm text-gray-900")}>
                  Basic Tee 6-Pack
                </Text>

                <View
                  style={tailwind(
                    "mt-0.5 space-y-px text-[10px] text-gray-600"
                  )}
                >
                  <View style={tailwind("flex flex-row")}>
                    <Text style={tailwind("inline")}>Size:</Text>
                    <Text style={tailwind("inline")}>XXS</Text>
                  </View>

                  <View style={tailwind("flex flex-row")}>
                    <Text style={tailwind("inline")}>Color:</Text>
                    <Text style={tailwind("inline")}>White</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={tailwind("space-y-4 text-center")}>
            <TouchableOpacity
              onPress={() => {}}
              style={tailwind(
                "block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
              )}
            >
              <Text>View my cart (2)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={tailwind(
                "block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              )}
            >
              <Text>Checkout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={tailwind(
                "inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
              )}
            >
              <Text>Continue shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
