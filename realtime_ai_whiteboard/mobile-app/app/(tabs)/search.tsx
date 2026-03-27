import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, fonts, radii } from "../../src/theme";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>
      <View style={styles.searchWrap}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search boards, people, tags..."
            placeholderTextColor={colors.placeholder}
          />
        </View>
      </View>
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Search for boards by name or tag</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16 },
  title: { ...fonts.h1, color: colors.heading },
  searchWrap: { paddingHorizontal: 16, paddingVertical: 8 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: radii.md,
    paddingHorizontal: 16,
    height: 36,
  },
  searchIcon: { fontSize: 14, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, fontWeight: "500", color: colors.body },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { ...fonts.bodySmall, color: colors.muted },
});
