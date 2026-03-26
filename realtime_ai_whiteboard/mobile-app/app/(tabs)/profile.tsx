import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../../src/stores/auth";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {(user?.name ?? "G")[0].toUpperCase()}
        </Text>
      </View>
      <Text style={styles.name}>{user?.name ?? "Guest User"}</Text>
      <Text style={styles.email}>{user?.email ?? "guest@example.com"}</Text>

      <View style={styles.section}>
        <Row label="Boards created" value="6" />
        <Row label="AI messages" value="42" />
        <Row label="Plan" value="Free" />
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    paddingTop: 48,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "700" },
  name: { fontSize: 22, fontWeight: "700", color: "#111827" },
  email: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  section: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 32,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  rowLabel: { fontSize: 15, color: "#374151" },
  rowValue: { fontSize: 15, fontWeight: "600", color: "#111827" },
  logoutBtn: {
    marginTop: 32,
    backgroundColor: "#EF4444",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 48,
  },
  logoutText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
