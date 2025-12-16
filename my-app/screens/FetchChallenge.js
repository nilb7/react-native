// ...existing code...
import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    Pressable,
    Platform
} from "react-native";

class FetchChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      loading: true,
      refreshing: false,
      error: null,
    };
  }

  componentDidMount() {
    this.loadComments();
  }

  loadComments = async () => {
    this.setState({ loading: true, error: null });
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/comments");
      const json = await res.json();
      this.setState({ comments: json });
    } catch (e) {
      this.setState({ error: "Unable to load comments." });
      console.log(e);
    } finally {
      this.setState({ loading: false, refreshing: false });
    }
  };

  onRefresh = () => this.setState({ refreshing: true }, this.loadComments);

  renderItem = ({ item }) => {
    const avatarLetter = (item.name || item.email || "?").charAt(0).toUpperCase();
    return (
      <Pressable style={styles.card} android_ripple={{ color: "#eef2ff" }}>
        <View style={styles.row}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.headerRow}>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.id}>#{item.id}</Text>
            </View>

            <Text style={styles.email} numberOfLines={1}>{item.email}</Text>
            <Text style={styles.body} numberOfLines={3}>{item.body}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  render() {
    const { comments, loading, refreshing, error } = this.state;

    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Comments</Text>
          <Text style={styles.subtitle}>
            {loading ? "Loading…" : `${comments.length} comments`}
          </Text>
        </View>

        {loading && !refreshing ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#2563eb" />
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.error}>{error}</Text>
            <Pressable style={styles.retry} onPress={this.loadComments}>
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={this.renderItem}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
                colors={["#2563eb"]}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomColor: "#e6e9ef",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: 4,
    color: "#6b7280",
    fontSize: 13,
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#1e40af",
    fontWeight: "700",
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
    flex: 1,
    marginRight: 8,
  },
  id: {
    color: "#94a3b8",
    fontSize: 12,
  },
  email: {
    marginTop: 4,
    color: "#6b7280",
    fontSize: 13,
  },
  body: {
    marginTop: 8,
    color: "#334155",
    fontSize: 14,
    lineHeight: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    padding: 20,
    alignItems: "center",
  },
  error: {
    color: "#b91c1c",
    marginBottom: 10,
  },
  retry: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default FetchChallenge;
// ...existing code...