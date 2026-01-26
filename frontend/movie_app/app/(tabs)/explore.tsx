import { StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AnimeCard } from '@/components/AnimeCard';
import { api } from '@/services/api';
import { Anime } from '@/types/anime';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await api.searchAnime(query);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Explore Anime</ThemedText>
        </ThemedView>

        <ThemedView style={[styles.searchContainer, { backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0' }]}>
          <Ionicons name="search" size={20} color={isDark ? '#ccc' : '#666'} style={styles.searchIcon} />
          <TextInput
            style={[styles.input, { color: isDark ? '#fff' : '#000' }]}
            placeholder="Search by title..."
            placeholderTextColor={isDark ? '#aaa' : '#888'}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color={isDark ? '#ccc' : '#666'} />
            </TouchableOpacity>
          )}
        </ThemedView>

        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <AnimeCard anime={item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              !loading && query.length > 0 ? (
                <ThemedText style={{ textAlign: 'center', marginTop: 20 }}>No results found.</ThemedText>
              ) : null
            }
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4, // Fix android padding
  },
  listContent: {
    padding: 8,
  }
});
