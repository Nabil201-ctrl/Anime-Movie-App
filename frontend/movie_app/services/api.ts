import { Platform } from 'react-native';
import { Anime, AnimeListResponse } from '../types/anime';

// Determine Base URL based on platform
// For Android Emulator use 10.0.2.2, for iOS/Web use localhost
const DEV_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const PORT = '5214'; // HTTP port
const BASE_URL = `http://${DEV_HOST}:${PORT}/api`;

export const api = {
    getRankings: async (page = 1, size = 10): Promise<AnimeListResponse> => {
        try {
            const response = await fetch(`${BASE_URL}/rankings?page=${page}&size=${size}`);
            if (!response.ok) throw new Error('Failed to fetch rankings');
            return await response.json();
        } catch (error) {
            console.error('getRankings error:', error);
            throw error;
        }
    },

    searchAnime: async (title: string, page = 1, size = 10): Promise<AnimeListResponse> => {
        try {
            const response = await fetch(`${BASE_URL}/search?title=${encodeURIComponent(title)}&page=${page}&size=${size}`);
            if (!response.ok) throw new Error('Failed to search anime');
            return await response.json();
        } catch (error) {
            console.error('searchAnime error:', error);
            throw error;
        }
    },

    getAnimeById: async (id: string): Promise<Anime> => {
        try {
            const response = await fetch(`${BASE_URL}/anime/${id}`);
            if (!response.ok) throw new Error('Failed to fetch anime details');
            return await response.json();
        } catch (error) {
            console.error('getAnimeById error:', error);
            throw error;
        }
    },

    getGenres: async (): Promise<string[]> => {
        try {
            const response = await fetch(`${BASE_URL}/genres`);
            if (!response.ok) throw new Error('Failed to fetch genres');
            return await response.json();
        } catch (error) {
            console.error('getGenres error:', error);
            throw error;
        }
    }
};
