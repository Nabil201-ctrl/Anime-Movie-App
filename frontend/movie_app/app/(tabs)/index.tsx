import { StyleSheet, FlatList, ActivityIndicator, Platform, RefreshControl, ScrollView, View } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AnimeCard } from '@/components/AnimeCard';
import { HeroCard } from '@/components/HeroCard';
import { useRankings } from '@/hooks/useAnime';

export default function HomeScreen() {
  const { data: response, isLoading, refetch, isRefetching } = useRankings(1, 20);
  const data = response?.data || [];

  const onRefresh = () => {
    refetch();
  };

  if (isLoading && !isRefetching) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" color="#ffffff" />
      </ThemedView>
    );
  }

  const heroAnime = data.length > 0 ? data[0] : null;
  const trendingAnime = data.length > 1 ? data.slice(1, 6) : [];
  const topRatedAnime = data.length > 6 ? data.slice(6) : [];

  return (
    <ThemedView style={styles.container}>
      {/* Remove SafeAreaView here if we want Hero to bleed to top, but usually safe area is needed. 
          Actually, for immersive Hero, we might want to ignore top safe area. 
          Let's keep SafeArea for now but maybe remove top padding from header.
      */}
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* We use ScrollView for the main page layout */}
        <ScrollView
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.headerTitle}>Anime<ThemedText style={{ color: '#FFD700' }}>DB</ThemedText></ThemedText>
          </ThemedView>

          {heroAnime && <HeroCard anime={heroAnime} />}

          {trendingAnime.length > 0 && (
            <View style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Trending Now</ThemedText>
              <FlatList
                horizontal
                data={trendingAnime}
                renderItem={({ item }) => <AnimeCard anime={item} />} // We might want a smaller card for horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            </View>
          )}

          {topRatedAnime.length > 0 && (
            <View style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Top Rated</ThemedText>
              {/* Render as a simple map to avoid nested virtualized lists warning if using FlatList inside ScrollView */}
              <View style={styles.grid}>
                {topRatedAnime.map(item => (
                  <View key={item.id} style={styles.gridItem}>
                    <AnimeCard anime={item} />
                  </View>
                ))}
              </View>
            </View>
          )}

        </ScrollView>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16, // Extra padding for Android status bar if safe area fails
  },
  listContent: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  horizontalList: {
    paddingHorizontal: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  gridItem: {
    width: '50%',
    padding: 4,
  }
});
