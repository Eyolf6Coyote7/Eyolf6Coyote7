import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../src/stores/auth";
import { colors, fonts, radii, shadows } from "../src/theme";

export default function AuthScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async () => {
    await login(email, password);
    router.replace("/(tabs)/boards");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Decorative blurs */}
      <View style={styles.blurTopRight} />
      <View style={styles.blurBottomLeft} />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="document-text" size={24} color={colors.primary} />
        <Text style={styles.headerTitle}>Whiteboard AI</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Hero */}
        {isLogin && (
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Welcome Back</Text>
            <Text style={styles.heroSubtitle}>
              Sign in to continue your work.
            </Text>
          </View>
        )}

        {/* Tab switcher */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, !isLogin && styles.tabActive]}
            onPress={() => setIsLogin(false)}
          >
            <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, isLogin && styles.tabActive]}
            onPress={() => setIsLogin(true)}
          >
            <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={isLogin ? styles.formCard : styles.formFlat}>
          {!isLogin && (
            <View style={styles.field}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor={colors.muted}
                value={name}
                onChangeText={setName}
              />
            </View>
          )}

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder={isLogin ? "name@example.com" : "you@example.com"}
              placeholderTextColor={colors.muted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrap}>
              <TextInput
                style={styles.passwordInput}
                placeholder={isLogin ? "••••••••" : "Min 8 characters"}
                placeholderTextColor={colors.muted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPw}
              />
              <TouchableOpacity
                onPress={() => setShowPw(!showPw)}
                style={styles.eyeBtn}
              >
                <Ionicons
                  name={showPw ? "eye" : "eye-off"}
                  size={18}
                  color="#585F6C"
                />
              </TouchableOpacity>
            </View>
          </View>

          {isLogin && (
            <View style={styles.forgotRow}>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          )}

          {!isLogin && (
            <View style={styles.aiHint}>
              <Ionicons name="sparkles" size={12} color={colors.primaryDark} />
              <Text style={styles.aiHintText}>
                AI suggests using a complex password
              </Text>
            </View>
          )}

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitText}>
              {isLogin ? "Log In" : "Create Account"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* OAuth */}
          {isLogin ? (
            <View style={styles.oauthRow}>
              <TouchableOpacity style={styles.oauthBtnHalf}>
                <Text style={styles.oauthLabel}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.oauthBtnHalf}>
                <Ionicons name="logo-github" size={16} color={colors.heading} />
                <Text style={styles.oauthLabel}>GitHub</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.oauthCol}>
              <TouchableOpacity style={styles.oauthBtnFull}>
                <Text style={styles.oauthLabel}>Continue with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.oauthBtnFull}>
                <Ionicons name="logo-github" size={20} color={colors.heading} />
                <Text style={styles.oauthLabel}>Continue with GitHub</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Footer link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </Text>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.footerLink}>
              {isLogin ? "Sign up" : "Log in"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  blurTopRight: {
    position: "absolute",
    width: 256,
    height: 256,
    right: -39,
    top: -100,
    backgroundColor: "rgba(0, 74, 198, 0.1)",
    borderRadius: 9999,
    opacity: 0.5,
  },
  blurBottomLeft: {
    position: "absolute",
    width: 320,
    height: 320,
    left: -39,
    bottom: -100,
    backgroundColor: "rgba(96, 165, 250, 0.1)",
    borderRadius: 9999,
    opacity: 0.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingTop: 60,
    paddingBottom: 28,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.heading,
    letterSpacing: -0.5,
  },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 48 },

  hero: { alignItems: "center", marginBottom: 24 },
  heroTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.heading,
    letterSpacing: -0.9,
  },
  heroSubtitle: { fontSize: 18, color: "#585F6C", marginTop: 8 },

  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    marginBottom: 24,
  },
  tab: { paddingBottom: 8 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  tabText: { fontSize: 16, fontWeight: "500", color: "#64748B" },
  tabTextActive: { fontWeight: "700", color: colors.primary },

  formCard: {
    backgroundColor: colors.white,
    borderRadius: 32,
    padding: 16,
    ...shadows.elevated,
  },
  formFlat: { gap: 16 },

  field: { marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.body,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#F3F4F5",
    borderRadius: radii.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.heading,
  },
  passwordWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F5",
    borderRadius: radii.md,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.heading,
  },
  eyeBtn: { padding: 14 },
  forgotRow: { alignItems: "flex-end", marginBottom: 16 },
  forgotText: { fontSize: 14, fontWeight: "600", color: colors.primaryDark },

  aiHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primarySoft,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  aiHintText: { fontSize: 11, fontWeight: "500", color: colors.primaryDark },

  submitBtn: {
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors.primary,
    shadowColor: "#004AC6",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  submitText: { ...fonts.button, color: colors.white },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginVertical: 20,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#E7E8E9" },
  dividerText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.muted,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },

  oauthRow: { flexDirection: "row", gap: 10 },
  oauthBtnHalf: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F3F4F5",
    borderRadius: radii.md,
    paddingVertical: 14,
  },
  oauthCol: { gap: 10 },
  oauthBtnFull: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "rgba(195, 198, 215, 0.5)",
    borderRadius: radii.md,
    paddingVertical: 12,
  },
  oauthLabel: { fontSize: 15, fontWeight: "600", color: colors.heading },

  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { fontSize: 14, color: "#585F6C" },
  footerLink: { fontSize: 14, fontWeight: "700", color: colors.primary },
});
