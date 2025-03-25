import { fetchSummonerIconAndLevel, fetchSummonerData, fetchChampionMasteries, fetchChampionsData } from '../api/lolApi';
import create from 'zustand';
import axios from 'axios';

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  image: {
    full: string;
  };
}

export interface ChampionMastery {
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  chestGranted: boolean;
  tokensEarned: number;
}

export interface MasteryWithChampion extends ChampionMastery {
  champion: Champion;
}

export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  gameName: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

interface LolStore {
  summoner: Summoner | null;
  masteries: MasteryWithChampion[];
  champions: Record<string, Champion>;
  isLoading: boolean;
  error: string | null;
  summonerIcon: string | null;
  summonerLevel: number | null;
  totalMasteryPoints: number | null;
  searchSummoner: (name: string, tag: string) => Promise<void>;
  getChampionById: (id: number) => Champion | undefined;
  getChampionImageUrl: (championId: string) => string;
}

export const useLolStore = create<LolStore>((set, get) => ({
  summoner: null,
  masteries: [],
  champions: {},
  summonerIcon: null,
  summonerLevel: null,
  isLoading: false,
  error: null,
  totalMasteryPoints: null,

  searchSummoner: async (name: string, tag: string) => {
    if (!name.trim() || !tag.trim()) return;

    set({ isLoading: true, error: null });

    try {
      const summonerData = await fetchSummonerData(name, tag);
      if (!summonerData) {
        throw new Error('Invocador não encontrado');
      }

      const masteryData = await fetchChampionMasteries(summonerData.puuid);

      let championsData = get().champions;
      if (Object.keys(championsData).length === 0) {
        championsData = await fetchChampionsData();
        set({ champions: championsData });
      }

      const masteriesWithChampions = masteryData.map((mastery) => {
        const champion = Object.values(championsData).find(
          (champ) => Number(champ.key) === mastery.championId
        );

        return {
          ...mastery,
          champion: champion || {
            id: 'unknown',
            key: String(mastery.championId),
            name: 'Unknown Champion',
            title: '',
            image: { full: 'default.png' },
          },
        };
      });

      const totalMasteryPoints = masteriesWithChampions.reduce(
        (sum: number, mastery: ChampionMastery) => sum + mastery.championPoints,
        0
      );

      const iconData = await fetchSummonerIconAndLevel(summonerData.puuid);

      set({
        summoner: summonerData,
        masteries: masteriesWithChampions,
        summonerIcon: `https://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/${iconData.profileIconId}.png`,
        summonerLevel: iconData.summonerLevel,
        totalMasteryPoints,
        isLoading: false,
      });
    } catch (err) {
      console.error('Erro ao buscar dados do invocador:', err);
      set({
        error: err instanceof Error ? err.message : 'Erro desconhecido',
        isLoading: false,
      });
    }
  },


  getChampionById: (id: number) => {
    const { champions } = get();
    return Object.values(champions).find((champ) => Number(champ.key) === id);
  },

  getChampionImageUrl: (championId: string) => {
    return `https://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${championId}.png`;
  },
}));
