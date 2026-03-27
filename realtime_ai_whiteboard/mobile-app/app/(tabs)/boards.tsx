import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { api, Board } from "../../src/api";
import { useAuthStore } from "../../src/stores/auth";
import { colors, fonts, radii, shadows } from "../../src/theme";

function AvatarStack({
  collaborators,
}: {
  collaborators: Board["collaborators"];
}) {
  return (
    <View style={styles.avatarStack}>
      {collaborators.map((c, i) => (
        <View
          key={i}
          style={[
            styles.avatar,
            {
              backgroundColor: c.color,
              marginLeft: i > 0 ? -8 : 0,
              zIndex: collaborators.length - i,
            },
          ]}
        >
          <Text style={styles.avatarText}>{c.initials}</Text>
        </View>
      ))}
    </View>
  );
}

function BoardCard({ board }: { board: Board }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      {/* Thumbnail */}
      <View
        style={[styles.thumbnail, { backgroundColor: board.thumbnailColor }]}
      >
        <Ionicons name="easel-outline" size={24} color={colors.body} />
      </View>

      {/* Info */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {board.title}
        </Text>
        <Text style={styles.cardSubtitle}>{board.updatedAt}</Text>
        <View style={styles.cardMeta}>
          <AvatarStack collaborators={board.collaborators} />
        </View>
      </View>

      {/* More button */}
      <TouchableOpacity style={styles.moreBtn}>
        <Ionicons name="ellipsis-vertical" size={16} color={colors.body} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function BoardsScreen() {
  const [boards, setBoards] = useState<Board[]>([]);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    api.getBoards().then(setBoards);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Boards</Text>
        <View style={styles.profileBtn}>
          <Text style={styles.profileInitial}>
            {(user?.name ?? "J")[0].toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={15} color={colors.body} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search boards..."
            placeholderTextColor={colors.placeholder}
          />
        </View>
      </View>

      {/* Board List */}
      <FlatList
        data={boards}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <BoardCard board={item} />}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Ionicons name="add" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },

  // Header – matches Figma TopAppBar
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: colors.bg,
  },
  headerTitle: { ...fonts.h1, color: colors.heading },
  profileBtn: {
    width: 32,
    height: 32,
    borderRadius: radii.pill,
    backgroundColor: "#E7E8EA",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  profileInitial: { fontSize: 12, fontWeight: "700", color: colors.body },

  // Search
  searchWrap: { paddingHorizontal: 16, paddingVertical: 8 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: radii.md,
    paddingHorizontal: 16,
    height: 36,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14, fontWeight: "500", color: colors.body },

  // List
  list: { padding: 16, paddingBottom: 128, gap: 12 },

  // Card – matches Figma Board Card
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.cardBg,
    borderRadius: radii.lg,
    ...shadows.card,
  },
  thumbnail: {
    width: 80,
    height: 60,
    borderRadius: radii.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  cardInfo: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: { ...fonts.h3, color: colors.heading },
  cardSubtitle: { ...fonts.caption, color: colors.body, marginTop: 2 },
  cardMeta: { flexDirection: "row", alignItems: "center", marginTop: 6 },

  // Avatar stack
  avatarStack: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: radii.pill,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.white,
  },
  avatarText: { fontSize: 8, fontWeight: "700", color: colors.white },

  // More button
  moreBtn: { padding: 8 },

  // FAB – matches Figma Floating Action Button
  fab: {
    position: "absolute",
    right: 24,
    bottom: 96,
    width: 56,
    height: 56,
    borderRadius: radii.pill,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.fab,
    backgroundColor: colors.primary,
  },
});
