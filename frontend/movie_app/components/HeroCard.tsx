import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { Anime } from '@/types/anime';

interface HeroCardProps {
    anime: Anime;
}

const { width } = Dimensions.get('window');

export function HeroCard({ anime }: HeroCardProps) {
    return (
        <Link href={`/anime/${anime.id}`} asChild>
            <TouchableOpacity activeOpacity={0.9} style={styles.container}>
                <Image
                    source={{ uri: anime.image }}
                    style={styles.image}
                    contentFit="cover"
                    transition={500}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradient}
                >
                    <View style={styles.content}>
                        <View style={styles.badgeRow}>
                            <View style={styles.rankBadge}>
                                <ThemedText style={styles.rankText}>#{anime.ranking}</ThemedText>
                            </View>
                            <View style={styles.typeBadge}>
                                <ThemedText style={styles.typeText}>Featured</ThemedText>
                            </View>
                        </View>
                        <ThemedText type="title" style={styles.title} numberOfLines={2}>
                            {anime.title}
                        </ThemedText>
                        <View style={styles.metaRow}>
                            <ThemedText style={styles.metaText}>{anime.episodes ?? '?'} Episodes</ThemedText>
                            <View style={styles.dot} />
                            <ThemedText style={styles.metaText}>{anime.genres?.[0] ?? 'Anime'}</ThemedText>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 450,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 250,
        justifyContent: 'flex-end',
        padding: 20,
    },
    content: {
        marginBottom: 20,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    rankBadge: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    rankText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 12,
    },
    typeBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    typeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 10,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        color: '#e0e0e0',
        fontSize: 14,
        fontWeight: '500',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 8,
    },
});
