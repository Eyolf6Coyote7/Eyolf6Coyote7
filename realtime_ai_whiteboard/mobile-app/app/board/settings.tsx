import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts, radii, shadows } from "../../src/theme";

function SectionLabel({ title, color }: { title: string; color?: string }) {
  return (
    <View style={styles.sectionLabel}>
      <Text style={[styles.sectionLabelText, color ? { color } : null]}>
        {title}
      </Text>
    </View>
  );
}

function SettingRow({
  label,
  value,
  right,
  showChevron = true,
}: {
  label: string;
  value?: string;
  right?: React.ReactNode;
  showChevron?: boolean;
}) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {right}
        {showChevron && (
          <Ionicons name="chevron-forward" size={10} color={colors.chevron} />
        )}
      </View>
    </View>
  );
}

function MemberRow({
  name,
  email,
  role,
  roleColor,
  avatarColor,
}: {
  name: string;
  email: string;
  role: string;
  roleColor?: string;
  avatarColor: string;
}) {
  return (
    <View style={styles.memberRow}>
      <View style={[styles.memberAvatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.memberInitial}>{name[0]}</Text>
      </View>
      <View style={styles.memberInfo}>
        <View style={styles.memberNameRow}>
          <Text style={styles.memberName}>{name}</Text>
          {roleColor && (
            <View
              style={[
                styles.roleBadge,
                { backgroundColor: "rgba(0, 88, 188, 0.1)" },
              ]}
            >
              <Text style={[styles.roleBadgeText, { color: "#0058BC" }]}>
                {role}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.memberEmail}>{email}</Text>
      </View>
      {!roleColor && (
        <View style={styles.memberRoleRight}>
          <Text style={styles.memberRoleText}>{role}</Text>
          <Ionicons name="chevron-forward" size={9} color={colors.chevron} />
        </View>
      )}
    </View>
  );
}

export default function BoardSettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={12} color="#0058BC" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Board Settings</Text>
        <TouchableOpacity>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Section 1: General */}
        <View style={styles.section}>
          <SettingRow label="Board Name" value="Product Brainstorm" />
          <View style={styles.divider} />
          <SettingRow label="Description" value="Add a description..." />
          <View style={styles.divider} />
          <SettingRow
            label="Board Color"
            showChevron={false}
            right={<View style={styles.colorDot} />}
          />
        </View>

        {/* Section 2: Sharing */}
        <SectionLabel title="SHARING" />
        <View style={styles.section}>
          <SettingRow label="Visibility" value="Team" />
          <View style={styles.divider} />
          <SettingRow label="Invite Members" />
          <View style={styles.divider} />
          {/* Guest link */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Guest Link</Text>
            <Switch value={true} trackColor={{ true: "#0058BC" }} />
          </View>
          {/* Link copy */}
          <View style={styles.linkRow}>
            <Text style={styles.linkText} numberOfLines={1}>
              whiteboard.app/v/x92...j29
            </Text>
            <TouchableOpacity>
              <Text style={styles.copyBtn}>Copy</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Allow Guest Editing</Text>
            <Switch value={false} trackColor={{ true: "#0058BC" }} />
          </View>
        </View>

        {/* Section 3: Members */}
        <SectionLabel title="MEMBERS (3)" />
        <View style={styles.section}>
          <MemberRow
            name="You"
            email="sarah.j@studio.arch"
            role="OWNER"
            roleColor="#0058BC"
            avatarColor="#C7D2FE"
          />
          <View style={styles.divider} />
          <MemberRow
            name="Alice Chen"
            email="alice.c@design.co"
            role="Editor"
            avatarColor="#F9A8D4"
          />
          <View style={styles.divider} />
          <MemberRow
            name="Bob Kim"
            email="bob.kim@freelance.io"
            role="Viewer"
            avatarColor="#93C5FD"
          />
        </View>

        {/* Section 4: Danger Zone */}
        <SectionLabel title="DANGER ZONE" color={colors.danger} />
        <View style={styles.section}>
          <TouchableOpacity style={styles.dangerRow}>
            <Text style={styles.dangerText}>Delete Board</Text>
            <Ionicons name="trash-outline" size={16} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <NavItem icon="easel-outline" label="BOARD" />
        <NavItem icon="library-outline" label="LIBRARY" />
        <NavItem icon="people-outline" label="TEAM" />
        <NavItem icon="settings-outline" label="SETTINGS" active />
      </View>
    </View>
  );
}

function NavItem({
  icon,
  label,
  active,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) {
  return (
    <View style={styles.navItem}>
      <Ionicons
        name={icon}
        size={16}
        color={active ? colors.primary : colors.tabInactive}
      />
      <Text style={[styles.navLabel, active && { color: colors.primary }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 52,
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(226, 232, 240, 0.5)",
  },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 2 },
  backText: { fontSize: 16, fontWeight: "500", color: "#0058BC" },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.heading,
    letterSpacing: -0.45,
  },
  saveText: { fontSize: 16, fontWeight: "600", color: "#0058BC" },

  scroll: { paddingTop: 32, paddingBottom: 120, gap: 0 },

  sectionLabel: { paddingHorizontal: 32, marginTop: 32, marginBottom: 8 },
  sectionLabelText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: "#626267",
  },

  section: {
    marginHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: radii.md,
  },

  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 48,
  },
  settingLabel: { fontSize: 16, color: colors.heading },
  settingRight: { flexDirection: "row", alignItems: "center", gap: 4 },
  settingValue: { fontSize: 16, color: "#626267" },

  divider: {
    height: 1,
    marginHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(113, 119, 134, 0.2)",
  },

  colorDot: {
    width: 24,
    height: 24,
    borderRadius: radii.pill,
    backgroundColor: "#0058BC",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: radii.sm,
    padding: 12,
  },
  linkText: { fontSize: 14, color: "#626267", flex: 1, marginRight: 16 },
  copyBtn: { fontSize: 14, fontWeight: "600", color: "#0058BC" },

  // Members
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  memberAvatar: {
    width: 32,
    height: 32,
    borderRadius: radii.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  memberInitial: { fontSize: 14, fontWeight: "600", color: colors.white },
  memberInfo: { flex: 1, marginLeft: 12 },
  memberNameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  memberName: { fontSize: 16, fontWeight: "700", color: colors.heading },
  roleBadge: {
    borderRadius: radii.pill,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  memberEmail: { fontSize: 12, color: "#626267", marginTop: 2 },
  memberRoleRight: { flexDirection: "row", alignItems: "center", gap: 4 },
  memberRoleText: { fontSize: 14, color: "#626267" },

  // Danger
  dangerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 48,
  },
  dangerText: { fontSize: 16, fontWeight: "500", color: colors.danger },

  // Bottom nav
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 64,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderTopWidth: 1,
    borderTopColor: "rgba(226, 232, 240, 0.5)",
  },
  navItem: { alignItems: "center", gap: 4 },
  navLabel: {
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.tabInactive,
  },
});
