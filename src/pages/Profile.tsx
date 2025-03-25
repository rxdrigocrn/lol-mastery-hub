
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLolStore } from '../store/lolStore';
import LoadingSpinner from '../components/LoadingSpinner';
import ChampionCard from '../components/ChampionCard';
import { formatNumber } from '../utils/formatters';

const Profile = () => {
  const { summoner, masteries, isLoading, summonerIcon, summonerLevel, totalMasteryPoints } = useLolStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !summoner) {
      navigate('/');
    }
  }, [summoner, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!summoner) return null;

  const topMasteries = [...masteries]
    .sort((a, b) => b.championPoints - a.championPoints)
    .slice(0, 5);



  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto page-transition">
      <div className="lol-glass rounded-lg p-6 md:p-8 animate-scale-in">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-lol-gold animate-glow">
              <img
                src={summonerIcon}
                alt="Summoner Icon"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

          <div className="text-center md:text-left">
            <h1 className="font-beaufort text-3xl md:text-4xl text-lol-light mb-2">
              {summoner.gameName}
            </h1>
            <p className="text-muted-foreground text-sm mb-4">
              Level {summonerLevel}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lol-blue font-beaufort text-sm">Total Champions With Masteries</h3>
                <p className="font-spiegel text-lg text-lol-light">
                  {masteries.length}
                </p>
              </div>
              <div>
                <h3 className="text-lol-blue font-beaufort text-sm">Total Points</h3>
                <p className="font-spiegel text-lg text-lol-light">
                  {formatNumber(totalMasteryPoints)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-beaufort text-xl text-lol-gold">Top Champions</h2>
            <button
              onClick={() => navigate('/champions')}
              className="text-lol-blue hover:text-lol-light transition-colors text-sm font-beaufort"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {topMasteries.map((mastery) => (
              <ChampionCard key={mastery.championId} mastery={mastery} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
