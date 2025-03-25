
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLolStore } from '../store/lolStore';
import { toast } from 'sonner';
import { SearchIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingSpinner from './LoadingSpinner';

const SearchBar = () => {
  const [summonerName, setSummonerName] = useState('');
  const [tag, setTag] = useState('');
  const { searchSummoner, isLoading, error } = useLolStore();
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!summonerName.trim()) {
      toast.error('Please enter a summoner name');
      return;
    }

    await searchSummoner(summonerName, tag);
    const store = useLolStore.getState();

    if (store.error) {
      toast.error(store.error);
    } else if (store.summoner) {
      toast.success(`Found summoner ${summonerName}`);
      navigate('/profile');
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
      <div className="relative flex items-center gap-2">
        <div className="relative w-full">
          <Input
            type="text"
            value={summonerName}
            onChange={(e) => setSummonerName(e.target.value)}
            placeholder="Enter summoner name..."
            className="lol-input w-full pl-10  py-6 border-lol-blue/20 focus:border-lol-blue/50 bg-black/40 text-lol-light shadow-inner shadow-black/30"
            disabled={isLoading}
          />

          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
            <SearchIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="relative w-full">
          <Input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter tag..."
            className="lol-input w-24 px-4 py-6 border-lol-blue/20 focus:border-lol-blue/50 bg-black/40 text-lol-light shadow-inner shadow-black/30"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          className="absolute -right-6 h-full px-6 font-beaufort bg-lol-blue text-white tracking-wider hover:bg-lol-blue/80 transition-all duration-300 rounded-r-md border-l border-lol-blue/30"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <LoadingSpinner size="sm" color="border-white" />
              <span>Searching</span>
            </div>
          ) : (
            'Search'
          )}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
