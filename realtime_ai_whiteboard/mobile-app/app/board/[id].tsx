import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, shadows } from "../../src/theme";

const TOOLS_ROW1 = [
  { icon: "move" as const, size: 18 },
  { icon: "square-outline" as const, size: 16 },
  { icon: "ellipse-outline" as const, size: 20 },
  { icon: "remove-outline" as const, size: 16 },
];

const TOOLS_ROW2 = [
  { icon: "text" as const, size: 18 },
  { icon: "image-outline" as const, size: 16 },
  { icon: "hand-left-outline" as const, size: 18 },
  { icon: "pencil" as const, size: 18, active: true },
];

export default function BoardCanvasScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Canvas area with dot grid */}
      <View style={styles.canvas}>
        {/* Zoom indicator */}
        <View style={styles.zoomBadge}>
          <Text style={styles.zoomText}>60%</Text>
        </View>

        {/* Simulated sticky notes */}
        <View
          style={[
            styles.stickyNote,
            { left: 46, top: 120, transform: [{ rotate: "-2deg" }] },
          ]}
        >
          <Text style={styles.stickyText}>
            Define User Personas{"\n"}for the new dashboard{"\n"}modules
          </Text>
          <Text style={styles.stickyAuthor}>@sarah</Text>
        </View>

        <View
          style={[
            styles.stickyNote,
            { left: 191, top: 150, transform: [{ rotate: "1deg" }] },
          ]}
        >
          <Text style={styles.stickyText}>
            Map out the checkout{"\n"}flow API endpoints
          </Text>
          <Text style={styles.stickyAuthor}>@alice</Text>
        </View>

        {/* Blue rectangle */}
        <View style={styles.blueRect}>
          <Text style={styles.blueRectText}>Technical Specs</Text>
        </View>

        {/* Alice's cursor */}
        <View style={styles.cursorWrap}>
          <View style={styles.cursorDot} />
          <View style={styles.cursorLabel}>
            <Text style={styles.cursorText}>Alice</Text>
          </View>
        </View>

        {/* Grip indicator */}
        <View style={styles.gripIndicator} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={16} color="#18181B" />
          </TouchableOpacity>
          <Text style={styles.boardTitle}>Sprint Planning</Text>
        </View>
        <View style={styles.headerRight}>
          {/* Avatar stack */}
          <View style={styles.avatarStack}>
            <View style={[styles.avatarSmall, { backgroundColor: "#7B9CFF" }]}>
              <Text style={styles.avatarSmallText}>JW</Text>
            </View>
            <View
              style={[
                styles.avatarSmall,
                { backgroundColor: "#2563EB", marginLeft: -8 },
              ]}
            >
              <Text style={styles.avatarSmallText}>+2</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.shareBtn}>
            <Text style={styles.shareBtnText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating toolbar cluster */}
      <View style={styles.toolbarCluster}>
        {/* AI sparkle button */}
        <TouchableOpacity style={styles.aiSparkle}>
          <Ionicons name="sparkles" size={22} color="#0050D4" />
        </TouchableOpacity>

        {/* Main toolbar */}
        <View style={styles.toolbar}>
          {/* Row 1 */}
          <View style={styles.toolRow}>
            {TOOLS_ROW1.map((t, i) => (
              <TouchableOpacity key={i} style={styles.toolBtn}>
                <Ionicons name={t.icon} size={t.size} color="#52525B" />
              </TouchableOpacity>
            ))}
          </View>
          {/* Row 2 */}
          <View style={styles.toolRow}>
            {TOOLS_ROW2.map((t, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.toolBtn, t.active && styles.toolBtnActive]}
              >
                <Ionicons
                  name={t.icon}
                  size={t.size}
                  color={t.active ? colors.white : "#52525B"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F6F6" },

  // Canvas
  canvas: { flex: 1, paddingTop: 56 },
  zoomBadge: {
    position: "absolute",
    left: 24,
    top: 80,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 40,
  },
  zoomText: { fontSize: 11, fontWeight: "600", color: "#5A5C5C" },

  // Sticky notes
  stickyNote: {
    position: "absolute",
    width: 115,
    height: 115,
    backgroundColor: "#FCF1C5",
    borderRadius: 2,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  stickyText: { fontSize: 10, lineHeight: 14, color: "#4E4828" },
  stickyAuthor: {
    fontSize: 8,
    fontWeight: "500",
    color: "#6C6542",
    marginTop: 8,
  },

  // Blue rectangle
  blueRect: {
    position: "absolute",
    left: 115,
    top: 310,
    width: 154,
    height: 77,
    backgroundColor: "#D5E4F8",
    borderWidth: 2,
    borderColor: "rgba(0, 80, 212, 0.2)",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  blueRectText: { fontSize: 12, fontWeight: "600", color: "#455363" },

  // Cursor
  cursorWrap: {
    position: "absolute",
    left: 270,
    top: 250,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cursorDot: {
    width: 7,
    height: 7,
    borderRadius: radii.pill,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: colors.white,
  },
  cursorLabel: {
    backgroundColor: "#10B981",
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  cursorText: { fontSize: 8, fontWeight: "500", color: colors.white },

  gripIndicator: {
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
    left: "50%",
    marginLeft: -24,
    width: 48,
    height: 4,
    backgroundColor: "#D3D5D5",
    opacity: 0.5,
    borderRadius: radii.pill,
  },

  // Header
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    marginTop: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 40,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  boardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#18181B",
    letterSpacing: -0.35,
  },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  avatarStack: { flexDirection: "row" },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: radii.pill,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.white,
  },
  avatarSmallText: { fontSize: 10, fontWeight: "700", color: colors.white },
  shareBtn: {
    backgroundColor: "#0050D4",
    borderRadius: radii.pill,
    paddingHorizontal: 16,
    paddingVertical: 6,
    ...shadows.card,
  },
  shareBtnText: { fontSize: 12, fontWeight: "700", color: "#F1F2FF" },

  // Floating toolbar
  toolbarCluster: {
    position: "absolute",
    bottom: 32,
    left: "5%",
    right: "5%",
    alignItems: "center",
    gap: 16,
  },
  aiSparkle: {
    width: 46,
    height: 46,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 4,
  },
  toolbar: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: radii.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  toolRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 24,
  },
  toolBtn: {
    width: 38,
    height: 38,
    borderRadius: radii.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  toolBtnActive: {
    backgroundColor: "#0050D4",
    shadowColor: "#0050D4",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
});
