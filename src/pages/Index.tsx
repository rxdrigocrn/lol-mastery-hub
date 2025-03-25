
import React from 'react';
import SearchBar from '../components/SearchBar';
import { useLolStore } from '../store/lolStore';
import { Sword, Trophy, UserIcon } from 'lucide-react';

const Index = () => {
  const { error } = useLolStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 from-lol-darker to-lol-dark relative overflow-hidden">
      {/* Background hexagons */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-lol-blue blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-64 h-64 rounded-full bg-lol-gold blur-[100px]"></div>
        <div className="absolute top-[40%] left-[50%] w-64 h-64 rounded-full bg-lol-blue/50 blur-[100px]"></div>
      </div>

      <div className="w-full max-w-4xl z-10 animate-fade-in">
        <div className="lol-glass p-8 rounded-lg shadow-2xl border border-lol-blue/20 overflow-hidden relative mb-12 transform hover:shadow-lol-blue/10 transition-all duration-500">
          {/* Glowing accent elements */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-lol-blue/10 blur-[30px]"></div>
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-lol-gold/10 blur-[30px]"></div>

          <div className="text-center mb-8 relative">
            <h1 className="font-beaufort text-5xl text-lol-gold mb-3 tracking-wider text-glow animate-scale-in">
              LoL Mastery Hub
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-lol-blue to-transparent mx-auto mb-4"></div>
            <p className="text-lol-light font-spiegel text-lg max-w-md mx-auto">
              Explore champion masteries and track your progress in League of Legends
            </p>
          </div>

          <div className="max-w-lg mx-auto relative">
            <SearchBar />

            {error && (
              <div className="mt-4 text-red-500 backdrop-blur-md bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-pulse">
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <FeatureCard
            icon={<UserIcon className="text-lol-blue" />}
            title="Summoner Profile"
            description="View detailed information about any summoner's ranking and achievements"
          />
          <FeatureCard
            icon={<Sword className="text-lol-blue" />}
            title="Champion Masteries"
            description="Explore all champion masteries with detailed statistics and visualizations"
          />
          <FeatureCard
            icon={<Trophy className="text-lol-blue" />}
            title="Champion Details"
            description="Dive deep into individual champion mastery data and progression"
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Enter "Faker" or "test" to explore demo data
          </p>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="lol-glass p-6 rounded-lg border border-lol-blue/20 transition-all duration-300 hover:border-lol-blue/40 hover:translate-y-[-5px] group">
    <div className="w-12 h-12 flex items-center justify-center mb-4 bg-gradient-to-b from-lol-darkblue to-black rounded-lg p-2 mx-auto group-hover:shadow-lg group-hover:shadow-lol-blue/10 transition-all duration-300">
      {icon}
    </div>
    <h3 className="font-beaufort text-lol-gold text-xl mb-2 text-center">{title}</h3>
    <p className="text-sm text-muted-foreground text-center">{description}</p>
  </div>
);

export default Index;
