
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLolStore } from '../store/lolStore';
import LoadingSpinner from '../components/LoadingSpinner';
import MasteryBadge from '../components/MasteryBadge';
import { formatNumber, formatLastPlayed, calculateProgressPercentage } from '../utils/formatters';
import { ChevronLeft } from 'lucide-react';
import { fetchChampionDetails } from '@/api/lolApi';

const ChampionDetail = () => {
  const { championId } = useParams<{ championId: string }>();
  const { summoner, masteries, isLoading } = useLolStore();
  const navigate = useNavigate();
  const [championDetails, setChampionDetails] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && (!summoner || !championId)) {
      navigate('/');
    }
    if (championId) {
      fetchChampionDetails(championId)
        .then((data) => setChampionDetails(data))
        .catch((error) => console.error('Erro ao buscar detalhes do campeão:', error));
    }
  }, [summoner, championId, isLoading, navigate]);

  if (isLoading || !championId || !summoner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const mastery = masteries.find(m => m.champion.id === championId);

  if (!mastery) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center">
        <p className="text-lol-light mb-4">Champion not found</p>
        <button
          onClick={() => navigate('/champions')}
          className="lol-button"
        >
          Back to Champions
        </button>
      </div>
    );
  }

  const { champion, championLevel, championPoints, lastPlayTime, championPointsSinceLastLevel, championPointsUntilNextLevel, chestGranted, tokensEarned } = mastery;

  const progressPercentage = calculateProgressPercentage(
    championPointsSinceLastLevel,
    championPointsUntilNextLevel
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto page-transition">
      <button
        onClick={() => navigate('/champions')}
        className="mb-4 flex items-center text-lol-blue hover:text-lol-light transition-colors"
      >
        <ChevronLeft size={20} />
        <span className="font-beaufort">Back to Champions</span>
      </button>

      <div className="lol-glass rounded-lg overflow-hidden animate-scale-in">
        <div className="relative h-64 sm:h-80 md:h-96">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
            alt={champion.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-beaufort text-3xl md:text-4xl text-lol-light">
                {champion.name}
              </h1>
              <p className="text-lol-gold font-spiegel italic">
                {champion.title}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <MasteryBadge level={championLevel} size="lg" />

              {chestGranted && (
                <div className="bg-lol-blue/20 p-2 rounded">
                  <img
                    src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/champion-chest-acquired.png"
                    alt="Chest Granted"
                    className="w-10 h-10"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-beaufort text-xl text-lol-blue mb-4">Mastery Details</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lol-light font-beaufort text-sm mb-1">Mastery Level</h3>
                  <div className="flex items-center">
                    <span className="text-xl font-beaufort text-lol-gold">{championLevel}</span>
                    {championLevel < 7 && tokensEarned > 0 && (
                      <div className="ml-4 flex items-center gap-1">
                        {Array.from({ length: tokensEarned }).map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-lol-blue" />
                        ))}
                        {Array.from({ length: (championLevel === 5 ? 2 : 3) - tokensEarned }).map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-gray-700" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lol-light font-beaufort text-sm mb-1">Mastery Points</h3>
                  <p className="text-xl font-beaufort text-lol-gold">{championPoints.toLocaleString()}</p>
                </div>

                <div>
                  <h3 className="text-lol-light font-beaufort text-sm mb-1">Last Played</h3>
                  <p className="text-lol-light">{formatLastPlayed(lastPlayTime)}</p>
                </div>

                {championLevel < 7 && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-lol-light font-beaufort">Next Level Progress</span>
                      <span className="text-lol-blue">
                        {championPointsSinceLastLevel.toLocaleString()} /
                        {championPointsUntilNextLevel > 0
                          ? championPointsUntilNextLevel.toLocaleString()
                          : 'Max'}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-lol-blue h-2 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {championPointsUntilNextLevel > 0
                        ? `${championPointsUntilNextLevel.toLocaleString()} points until level ${championLevel + 1}`
                        : 'Token collection in progress'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="font-beaufort text-xl text-lol-blue mb-4">Champion Information</h2>

              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${champion.id}.png`}
                  alt={champion.name}
                  className="w-24 h-24 rounded border-2 border-lol-blue/30"
                />

                <div>
                  <p className="text-muted-foreground mb-4">
                    {championDetails?.lore || 'No lore available'}
                  </p>

                  <a
                    href={`https://leagueoflegends.fandom.com/wiki/${champion.name.replace(/\s/g, '_')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lol-blue hover:text-lol-light underline transition-colors"
                  >
                    View on LoL Wiki
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionDetail;
