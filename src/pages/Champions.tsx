
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLolStore } from '../store/lolStore';
import LoadingSpinner from '../components/LoadingSpinner';
import ChampionCard from '../components/ChampionCard';
import { Search, SortAsc, SortDesc } from 'lucide-react';

const Champions = () => {
  const { summoner, masteries, isLoading } = useLolStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'points' | 'level' | 'name'>('points');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

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

  const filteredMasteries = masteries.filter(mastery =>
    mastery.champion.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMasteries = [...filteredMasteries].sort((a, b) => {
    if (sortOption === 'points') {
      return sortDirection === 'desc'
        ? b.championPoints - a.championPoints
        : a.championPoints - b.championPoints;
    }

    if (sortOption === 'level') {
      return sortDirection === 'desc'
        ? b.championLevel - a.championLevel
        : a.championLevel - b.championLevel;
    }

    // Sort by name
    return sortDirection === 'desc'
      ? b.champion.name.localeCompare(a.champion.name)
      : a.champion.name.localeCompare(b.champion.name);
  });

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
  };


  useEffect(() => {
    console.log(summoner)
  }, [summoner])

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto page-transition">
      <div className="lol-glass rounded-lg p-6 md:p-8 animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-beaufort text-2xl md:text-3xl text-lol-light">
            {summoner.gameName}'s Champions
          </h1>
          <span className="text-lol-blue font-beaufort">
            {filteredMasteries.length} Champions
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search champions..."
              className="lol-input w-full pl-10"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="lol-input"
            >
              <option value="points">Sort by Points</option>
              <option value="level">Sort by Level</option>
              <option value="name">Sort by Name</option>
            </select>

            <button
              onClick={toggleSortDirection}
              className="lol-input px-3 flex items-center justify-center"
              aria-label="Toggle sort direction"
            >
              {sortDirection === 'desc' ? <SortDesc size={18} /> : <SortAsc size={18} />}
            </button>
          </div>
        </div>

        {sortedMasteries.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No champions found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedMasteries.map((mastery) => (
              <ChampionCard key={mastery.championId} mastery={mastery} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Champions;
