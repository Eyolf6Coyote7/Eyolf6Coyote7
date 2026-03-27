import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts, radii, shadows } from "../../src/theme";

export default function CreateScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.option}>
          <View
            style={[
              styles.iconWrap,
              { backgroundColor: "rgba(37, 99, 235, 0.1)" },
            ]}
          >
            <Text style={styles.icon}>📝</Text>
          </View>
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Blank Board</Text>
            <Text style={styles.optionDesc}>Start from scratch</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <View
            style={[
              styles.iconWrap,
              { backgroundColor: "rgba(188, 72, 0, 0.1)" },
            ]}
          >
            <Text style={styles.icon}>📋</Text>
          </View>
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>From Template</Text>
            <Text style={styles.optionDesc}>Choose a pre-built layout</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <View
            style={[
              styles.iconWrap,
              { backgroundColor: "rgba(172, 191, 255, 0.1)" },
            ]}
          >
            <Text style={styles.icon}>🤖</Text>
          </View>
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>AI Generate</Text>
            <Text style={styles.optionDesc}>Let AI create a board for you</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16 },
  title: { ...fonts.h1, color: colors.heading },
  content: { padding: 16, gap: 12 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBg,
    borderRadius: radii.lg,
    padding: 16,
    ...shadows.card,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { fontSize: 24 },
  optionText: { marginLeft: 16, flex: 1 },
  optionTitle: { ...fonts.h3, color: colors.heading },
  optionDesc: { ...fonts.caption, color: colors.body, marginTop: 2 },
});
