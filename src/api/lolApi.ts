import axios from 'axios';

const DDRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn';
const DDRAGON_VERSION = '13.10.1';
const API_KEY = "RGAPI-21bd17e2-f1ba-46be-ba7d-6929a3bb4405";

export async function fetchSummonerData(summonerName: string, tag: string) {
  const response = await axios.get(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}`,
    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
    }
  );

  return response.data;
}

export async function fetchChampionMasteries(summonerId: string) {
  const response = await axios.get(`https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${summonerId}`,
    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
    }
  );
  return response.data;
}

export async function fetchChampionDetails(championName: string) {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/pt_BR/champion/${championName}.json`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do campeão");
  }

  const data = await response.json();
  return data.data[championName]
}

export async function fetchSummonerIconAndLevel(puuid: string) {
  const response = await axios.get(
    `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
    }
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Erro ao buscar ícone e nível do invocador");
  }
}

export async function fetchChampionsData() {
  const response = await fetch(`${DDRAGON_BASE_URL}/${DDRAGON_VERSION}/data/en_US/champion.json`);
  const data = await response.json();
  return data.data;
}

