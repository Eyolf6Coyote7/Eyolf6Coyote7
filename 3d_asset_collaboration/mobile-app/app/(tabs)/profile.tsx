import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>JW</Text>
      </View>
      <Text style={styles.name}>Jerry Wolf</Text>
      <Text style={styles.email}>jerry@example.com</Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Assets</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Teams</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#f8f9fa",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#6c5ce7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  initials: { color: "#fff", fontSize: 32, fontWeight: "700" },
  name: { fontSize: 22, fontWeight: "700", color: "#2d3436" },
  email: { fontSize: 14, color: "#636e72", marginTop: 4 },
  stats: { flexDirection: "row", marginTop: 36, gap: 32 },
  stat: { alignItems: "center" },
  statValue: { fontSize: 24, fontWeight: "700", color: "#6c5ce7" },
  statLabel: { fontSize: 13, color: "#636e72", marginTop: 4 },
});
