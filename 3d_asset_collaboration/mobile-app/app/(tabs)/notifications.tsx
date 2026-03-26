import { View, Text, FlatList, StyleSheet } from "react-native";
import { getNotifications } from "../../src/api";

const notifications = getNotifications();

export default function NotificationsScreen() {
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={[styles.card, !item.read && styles.unread]}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  unread: { borderLeftWidth: 4, borderLeftColor: "#6c5ce7" },
  title: { fontWeight: "700", fontSize: 15, marginBottom: 4 },
  body: { color: "#636e72", fontSize: 13, marginBottom: 6 },
  time: { color: "#b2bec3", fontSize: 11 },
});
