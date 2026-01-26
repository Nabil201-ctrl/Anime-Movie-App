import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Anime, AnimeListResponse } from '../types/anime';

export const useRankings = (page: number = 1, size: number = 20) => {
    return useQuery<AnimeListResponse>({
        queryKey: ['rankings', page, size],
        queryFn: () => api.getRankings(page, size),
    });
};

export const useAnimeSearch = (title: string, page: number = 1, size: number = 20) => {
    return useQuery<AnimeListResponse>({
        queryKey: ['search', title, page, size],
        queryFn: () => api.searchAnime(title, page, size),
        enabled: !!title, // Only search if title is not empty
    });
};

export const useAnimeDetails = (id: string) => {
    return useQuery<Anime>({
        queryKey: ['anime', id],
        queryFn: () => api.getAnimeById(id),
        enabled: !!id,
    });
};

export const useGenres = () => {
    return useQuery<string[]>({
        queryKey: ['genres'],
        queryFn: () => api.getGenres(),
    });
};
