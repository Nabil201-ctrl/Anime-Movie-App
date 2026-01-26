import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Anime } from '@/types/anime';
import { Link } from 'expo-router';

interface AnimeCardProps {
    anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
    return (
        <Link href={`/anime/${anime.id}`} asChild>
            <TouchableOpacity style={styles.card}>
                <Image
                    source={{ uri: anime.image }}
                    style={styles.image}
                    contentFit="cover"
                    transition={300}
                />
                <View style={styles.infoContainer}>
                    <ThemedText type="defaultSemiBold" numberOfLines={1} style={styles.title}>
                        {anime.title}
                    </ThemedText>
                    <View style={styles.metaRow}>
                        {anime.ranking && (
                            <ThemedText style={styles.rank}>Rank #{anime.ranking}</ThemedText>
                        )}
                        <ThemedText style={styles.episodes}>{anime.episodes ?? '?'} eps</ThemedText>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        borderRadius: 12,
        backgroundColor: '#2a2a2a', // Dark card background, adjust for theme later if needed
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: '100%',
        height: 200,
    },
    infoContainer: {
        padding: 12,
    },
    title: {
        fontSize: 16,
        marginBottom: 4,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    rank: {
        fontSize: 12,
        color: '#FFD700', // Gold for rank
    },
    episodes: {
        fontSize: 12,
        color: '#ccc',
    }
});
