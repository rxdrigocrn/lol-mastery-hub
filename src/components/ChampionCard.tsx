
import React from 'react';
import { Link } from 'react-router-dom';
import { MasteryWithChampion } from '../store/lolStore';
import MasteryBadge from './MasteryBadge';
import { formatNumber, formatLastPlayed } from '../utils/formatters';

interface ChampionCardProps {
  mastery: MasteryWithChampion;
  compact?: boolean;
}

const ChampionCard = ({ mastery, compact = false }: ChampionCardProps) => {
  const { champion, championLevel, championPoints, lastPlayTime } = mastery;

  if (compact) {
    return (
      <Link
        to={`/champion/${champion.id}`}
        className="lol-card p-2 flex items-center space-x-3 champion-card-hover"
      >
        <div className="relative">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${champion.id}.png`}
            alt={champion.name}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="absolute -bottom-2 -right-2">
            <MasteryBadge level={championLevel} size="sm" showText={false} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-beaufort text-sm text-lol-light truncate">{champion.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{formatNumber(championPoints)} pts</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/champion/${champion.id}`}
      className="lol-card flex flex-col champion-card-hover h-full"
    >
      <div className="relative">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
          alt={champion.name}
          className="w-full h-48 object-cover object-center"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-3 right-3">
          <MasteryBadge level={championLevel} />
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-beaufort text-lg text-lol-light">{champion.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{champion.title}</p>

        <div className="mt-auto space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Mastery Points</span>
            <span className="font-beaufort text-lol-gold">{formatNumber(championPoints)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Last Played</span>
            <span className="text-xs">{formatLastPlayed(lastPlayTime)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChampionCard;
