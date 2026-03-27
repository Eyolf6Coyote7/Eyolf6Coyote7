import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { api, ChatMessage } from "../../src/api";
import { colors, fonts, radii, shadows } from "../../src/theme";

const SUGGESTIONS = [
  "Summarize board",
  "Create diagram",
  "Organize notes",
  "Add labels",
];

function AiLabel() {
  return (
    <View style={styles.aiLabel}>
      <Ionicons name="sparkles" size={14} color={colors.primaryDark} />
      <Text style={styles.aiLabelText}>AI</Text>
    </View>
  );
}

function ActionCard() {
  return (
    <View style={styles.actionCard}>
      <View style={styles.actionCardHeader}>
        <View style={styles.actionIcon}>
          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
        </View>
        <View style={styles.actionInfo}>
          <Text style={styles.actionTitle}>
            Created to-do list from 3 sticky notes
          </Text>
          <Text style={styles.actionDesc}>
            Elements grouped and prioritized on the board area.
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.actionBtn}>
        <Text style={styles.actionBtnText}>View on Board</Text>
        <Ionicons name="arrow-forward" size={12} color={colors.primaryDark} />
      </TouchableOpacity>
    </View>
  );
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [showAction, setShowAction] = useState(true);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    api.getChatHistory().then(setMessages);
  }, []);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I've organized them by priority. Anything else you'd like me to do?",
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="chevron-back" size={18} color={colors.primaryDark} />
          <Text style={styles.backText}>Back to Board</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Assistant</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={16} color={colors.body} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        onContentSizeChange={() => listRef.current?.scrollToEnd()}
        ListHeaderComponent={
          <Text style={styles.timestamp}>Today, 2:30 PM</Text>
        }
        renderItem={({ item, index }) => (
          <View>
            {item.role === "assistant" && <AiLabel />}
            <View
              style={[
                styles.bubble,
                item.role === "user" ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text
                style={item.role === "user" ? styles.userText : styles.aiText}
              >
                {item.content}
              </Text>
            </View>
            {/* Show action card after second message */}
            {index === 1 && showAction && <ActionCard />}
          </View>
        )}
      />

      {/* Bottom controls */}
      <View style={styles.bottomArea}>
        {/* Suggestion chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {SUGGESTIONS.map((s) => (
            <TouchableOpacity key={s} style={styles.chip}>
              <Text style={styles.chipText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input bar */}
        <View style={styles.inputBar}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="Message AI..."
              placeholderTextColor="rgba(67, 70, 85, 0.5)"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={send}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.attachBtn}>
              <Ionicons name="attach" size={20} color="rgba(67, 70, 85, 0.4)" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sendBtn} onPress={send}>
            <Ionicons name="arrow-up" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48,
    height: 88,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(241, 245, 249, 0.5)",
  },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  backText: { fontSize: 14, fontWeight: "500", color: colors.primaryDark },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.heading,
    fontFamily: "System",
  },

  // Messages
  list: { padding: 16, paddingBottom: 8 },
  timestamp: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(67, 70, 85, 0.6)",
    textAlign: "center",
    letterSpacing: 0.3,
    marginBottom: 24,
  },

  aiLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
    marginLeft: 8,
  },
  aiLabelText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.body,
    letterSpacing: 0.65,
    textTransform: "uppercase",
    fontFamily: "System",
  },

  bubble: {
    maxWidth: "75%",
    padding: 16,
    marginBottom: 24,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
    borderRadius: 24,
    borderTopRightRadius: 8,
    ...shadows.card,
  },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: colors.inputBg,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.03)",
    ...shadows.card,
  },
  userText: { fontSize: 16, lineHeight: 26, color: colors.white },
  aiText: { fontSize: 16, lineHeight: 26, color: colors.heading },

  // Action card
  actionCard: {
    backgroundColor: colors.white,
    borderRadius: 32,
    borderLeftWidth: 4,
    borderLeftColor: colors.primaryDark,
    padding: 20,
    marginBottom: 24,
    ...shadows.card,
  },
  actionCardHeader: { flexDirection: "row", gap: 12, marginBottom: 16 },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.successBg,
    justifyContent: "center",
    alignItems: "center",
  },
  actionInfo: { flex: 1, gap: 4 },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.heading,
    lineHeight: 24,
  },
  actionDesc: { fontSize: 14, color: colors.body, lineHeight: 21 },
  actionBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: "rgba(0, 74, 198, 0.2)",
    borderRadius: radii.pill,
    paddingVertical: 10,
  },
  actionBtnText: { fontSize: 14, fontWeight: "600", color: colors.primaryDark },

  // Bottom area
  bottomArea: { paddingTop: 8 },
  chips: { paddingHorizontal: 16, gap: 8, marginBottom: 12 },
  chip: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: "rgba(0, 74, 198, 0.1)",
    borderRadius: radii.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipText: { fontSize: 13, fontWeight: "500", color: colors.primaryDark },

  // Input bar
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(241, 245, 249, 0.5)",
  },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: radii.pill,
    paddingHorizontal: 20,
    height: 48,
  },
  input: { flex: 1, fontSize: 16, color: colors.heading },
  attachBtn: { paddingLeft: 8 },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    backgroundColor: colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#004AC6",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
});
