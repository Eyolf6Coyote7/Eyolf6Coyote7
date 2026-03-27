import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../src/stores/auth";
import { colors, fonts, radii, shadows } from "../../src/theme";

function SectionHeader({ title, color }: { title: string; color?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, color ? { color } : null]}>
        {title}
      </Text>
    </View>
  );
}

function Row({
  label,
  value,
  valueColor,
  showChevron = true,
  right,
}: {
  label: string;
  value?: string;
  valueColor?: string;
  showChevron?: boolean;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowRight}>
        {value && (
          <Text
            style={[styles.rowValue, valueColor ? { color: valueColor } : null]}
          >
            {value}
          </Text>
        )}
        {right}
        {showChevron && (
          <Ionicons name="chevron-forward" size={10} color={colors.chevron} />
        )}
      </View>
    </View>
  );
}

function ProgressRow({
  label,
  current,
  total,
}: {
  label: string;
  current: number;
  total: number;
}) {
  const pct = current / total;
  return (
    <View style={styles.progressRow}>
      <Text style={styles.progressLabel}>{label}</Text>
      <View style={styles.progressRight}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${pct * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {current} / {total}
        </Text>
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const { user, logout } = useAuthStore();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={18} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 18 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Profile header */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(user?.name ?? "J")[0].toUpperCase()}
              </Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="camera" size={11} color={colors.white} />
            </View>
          </View>
          <View style={styles.profileNameRow}>
            <Text style={styles.profileName}>{user?.name ?? "Jerry Wolf"}</Text>
            <View style={styles.verifiedTag}>
              <Ionicons
                name="checkmark-circle"
                size={8}
                color={colors.successText}
              />
              <Text style={styles.verifiedTagText}>Verified</Text>
            </View>
          </View>
          <Text style={styles.profileEmail}>
            {user?.email ?? "jerry@example.com"}
          </Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* ACCOUNT */}
        <SectionHeader title="ACCOUNT" />
        <View style={styles.section}>
          <Row label="Display Name" value="Jerry Wolf" />
          <View style={styles.divider} />
          <Row label="Email" value="jerry@example.com" />
          <View style={styles.divider} />
          <Row
            label="Password"
            value="Change"
            valueColor={colors.primaryDark}
          />
          <View style={styles.divider} />
          <Row
            label="Two-Factor Auth"
            showChevron={false}
            right={
              <Switch value={false} trackColor={{ true: colors.primaryDark }} />
            }
          />
        </View>

        {/* PLAN & USAGE */}
        <SectionHeader title="PLAN & USAGE" />
        <View style={styles.section}>
          <View style={styles.planRow}>
            <Text style={styles.rowLabel}>Current Plan</Text>
            <View style={styles.planRight}>
              <View style={styles.planBadge}>
                <Text style={styles.planBadgeText}>Free</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={10}
                color={colors.chevron}
              />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.usageSection}>
            <ProgressRow label="Boards" current={2} total={3} />
            <ProgressRow label="AI Queries" current={47} total={100} />
          </View>
          <TouchableOpacity style={styles.upgradeRow}>
            <Ionicons name="star" size={20} color={colors.primaryDark} />
            <Text style={styles.upgradeText}>Upgrade to Pro</Text>
            <View style={{ flex: 1 }} />
            <Ionicons
              name="chevron-forward"
              size={10}
              color={colors.primaryDark}
            />
          </TouchableOpacity>
        </View>

        {/* TEAM */}
        <SectionHeader title="TEAM" />
        <View style={styles.section}>
          <Row label="Team Members" value="3" />
          <View style={styles.divider} />
          <Row label="Invite Members" valueColor={colors.primaryDark} />
        </View>

        {/* PREFERENCES */}
        <SectionHeader title="PREFERENCES" />
        <View style={styles.section}>
          <Row label="Notifications" />
          <View style={styles.divider} />
          <Row
            label="Dark Mode"
            showChevron={false}
            right={
              <Switch value={false} trackColor={{ true: colors.primaryDark }} />
            }
          />
          <View style={styles.divider} />
          <Row
            label="Haptic Feedback"
            showChevron={false}
            right={
              <Switch value={true} trackColor={{ true: colors.primaryDark }} />
            }
          />
        </View>

        {/* ABOUT */}
        <SectionHeader title="ABOUT" />
        <View style={styles.section}>
          <Row label="Version" value="1.0.0" showChevron={false} />
          <View style={styles.divider} />
          <Row label="Terms of Service" />
          <View style={styles.divider} />
          <Row label="Privacy Policy" />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.settingsBg },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 8,
    backgroundColor: "rgba(248, 250, 252, 0.8)",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.7,
  },

  scroll: { paddingBottom: 120 },

  // Profile
  profileCard: {
    alignItems: "center",
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: radii.md,
    padding: 24,
    ...shadows.card,
  },
  avatarWrap: { position: "relative", marginBottom: 16 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#C7D2FE",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.divider,
  },
  avatarText: { fontSize: 28, fontWeight: "700", color: colors.primaryDark },
  verifiedBadge: {
    position: "absolute",
    right: -4,
    bottom: 0,
    width: 28,
    height: 26,
    borderRadius: radii.pill,
    backgroundColor: colors.primaryDark,
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  profileNameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  profileName: { ...fonts.h2, color: colors.heading },
  verifiedTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: colors.successBadge,
    borderRadius: radii.pill,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  verifiedTagText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.successText,
  },
  profileEmail: { ...fonts.bodySmall, color: colors.body, marginTop: 2 },
  editBtn: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    borderRadius: radii.sm,
    paddingVertical: 6,
    paddingHorizontal: 32,
  },
  editBtnText: { fontSize: 13, fontWeight: "600", color: colors.primaryDark },

  // Section
  sectionHeader: { paddingHorizontal: 24, marginTop: 32, marginBottom: 8 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: colors.body,
  },
  section: {
    marginHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    ...shadows.card,
  },

  // Rows
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 48,
  },
  rowLabel: { fontSize: 16, fontWeight: "500", color: colors.heading },
  rowRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  rowValue: { fontSize: 14, color: colors.body },
  divider: { height: 1, backgroundColor: colors.divider, marginHorizontal: 8 },

  // Plan
  planRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
  },
  planRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  planBadge: {
    backgroundColor: "#EFF6FF",
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  planBadgeText: { fontSize: 12, fontWeight: "700", color: colors.primaryDark },

  // Usage
  usageSection: { paddingHorizontal: 16, paddingVertical: 15, gap: 15 },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: { fontSize: 13, color: colors.body },
  progressRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  progressTrack: {
    width: 120,
    height: 6,
    backgroundColor: colors.divider,
    borderRadius: radii.pill,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.primaryDark,
    borderRadius: radii.pill,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.heading,
    width: 50,
  },

  // Upgrade
  upgradeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: "#EFF6FF",
    borderBottomLeftRadius: radii.md,
    borderBottomRightRadius: radii.md,
  },
  upgradeText: { fontSize: 16, fontWeight: "700", color: colors.primaryDark },

  // Logout
  logoutBtn: {
    marginHorizontal: 16,
    marginTop: 32,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: "center",
    ...shadows.card,
  },
  logoutText: { fontSize: 17, fontWeight: "600", color: colors.dangerButton },
});
