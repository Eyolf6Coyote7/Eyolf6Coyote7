import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../src/theme";

export default function SplashScreen() {
  const router = useRouter();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      router.replace("/(tabs)/boards");
    });
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {/* Decorative blurs */}
      <View style={styles.blurTopRight} />
      <View style={styles.blurBottomLeft} />

      {/* Center content */}
      <View style={styles.center}>
        {/* App Icon */}
        <View style={styles.logoBox}>
          <Ionicons name="document-text" size={30} color={colors.white} />
        </View>

        {/* App Name */}
        <Text style={styles.appName}>Whiteboard AI</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>Think together, in real time</Text>

        {/* Loading bar */}
        <View style={styles.loadingTrack}>
          <Animated.View
            style={[styles.loadingFill, { width: progressWidth }]}
          />
        </View>
      </View>

      {/* Bottom branding */}
      <Text style={styles.branding}>BY JERRY WOLF</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  blurTopRight: {
    position: "absolute",
    width: 234,
    height: 354,
    right: -39,
    top: -88,
    backgroundColor: "rgba(0, 74, 198, 0.05)",
    borderRadius: 12,
    opacity: 0.6,
  },
  blurBottomLeft: {
    position: "absolute",
    width: 195,
    height: 265,
    left: -39,
    bottom: -44,
    backgroundColor: "rgba(219, 225, 255, 0.3)",
    borderRadius: 12,
    opacity: 0.6,
  },
  center: { alignItems: "center" },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOpacity: 0.15,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#141B2B",
    letterSpacing: -0.96,
    lineHeight: 30,
  },
  tagline: {
    fontSize: 14,
    fontWeight: "400",
    color: "#585F6C",
    letterSpacing: -0.35,
    marginTop: 7,
    lineHeight: 23,
  },
  loadingTrack: {
    width: 120,
    height: 3,
    backgroundColor: "#DCE2F7",
    borderRadius: 12,
    marginTop: 40,
    overflow: "hidden",
  },
  loadingFill: {
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  branding: {
    position: "absolute",
    bottom: 64,
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: "#737686",
  },
});
