import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "../src/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Provider>
  );
}
