import { StyleSheet, ScrollView, ActivityIndicator, View, Platform } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
// import { getColors } from 'react-native-image-colors'; // Not supported in Expo Go
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { api } from '@/services/api';
import { Anime } from '@/types/anime';
import { Ionicons } from '@expo/vector-icons';

export default function AnimeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [bgColor, setBgColor] = useState<string>('#151718');

  useEffect(() => {
    if (typeof id === 'string') {
      api.getAnimeById(id)
        .then(async (data) => {
          setAnime(data);
          // Dynamic color extraction requires native build (not Expo Go)
          // For now, we use a default or mapped color
          setBgColor('#151718');
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" color="#ffffff" />
      </ThemedView>
    );
  }

  if (!anime) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Anime not found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: anime.title,
          headerBackTitle: 'Back',
          headerTransparent: true,
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'transparent' }
        }}
      />
      <LinearGradient
        colors={[bgColor, '#151718']}
        style={styles.gradientBackground}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: anime.image }}
          style={styles.heroImage}
          contentFit="cover"
          transition={500}
        />

        <View style={styles.detailsContainer}>
          <ThemedText type="title" style={styles.title}>{anime.title}</ThemedText>

          <View style={styles.statsRow}>
            {anime.ranking && (
              <View style={styles.badge}>
                <Ionicons name="trophy" size={14} color="#FFD700" />
                <ThemedText style={styles.badgeText}>Rank #{anime.ranking}</ThemedText>
              </View>
            )}
            <View style={styles.badge}>
              <Ionicons name="tv" size={14} color="#fff" />
              <ThemedText style={styles.badgeText}>{anime.episodes ?? '?'} Episodes</ThemedText>
            </View>
          </View>

          <View style={styles.genreRow}>
            {anime.genres?.map(g => (
              <View key={g} style={[styles.genreTag, { borderColor: bgColor, borderWidth: 1 }]}>
                <ThemedText style={styles.genreText}>{g}</ThemedText>
              </View>
            ))}
          </View>

          <ThemedText type="subtitle" style={styles.sectionTitle}>Synopsis</ThemedText>
          <ThemedText style={styles.synopsis}>{anime.synopsis}</ThemedText>
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151718',
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingBottom: 40,
  },
  heroImage: {
    width: '100%',
    height: 400,
  },
  detailsContainer: {
    padding: 24,
    marginTop: -40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#151718',
    minHeight: 500,
  },
  title: {
    marginBottom: 16,
    fontSize: 28,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  genreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  genreTag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  genreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 20,
  },
  synopsis: {
    lineHeight: 26,
    opacity: 0.9,
    fontSize: 16,
  }
});
