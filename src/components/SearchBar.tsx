import { Search, Loader2, X } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (interno: string) => void;
  isLoading: boolean;
  isLarge?: boolean;
}

export function SearchBar({ onSearch, isLoading, isLarge }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${isLarge ? 'max-w-xl' : 'max-w-sm'}`}>
      <div className="relative group">
        <input
          type="text"
          className={`w-full bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 rounded-[1.5rem] transition-all focus:outline-none font-bold text-white placeholder:text-slate-500 ${
            isLarge ? 'pl-8 pr-20 py-6 text-2xl rounded-[2.5rem]' : 'pl-4 pr-10 py-2.5 text-sm rounded-full'
          }`}
          placeholder="N° de Interno..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit"
          className={`absolute top-1/2 -translate-y-1/2 transition-all flex items-center justify-center ${
            isLarge ? 'right-4 w-16 h-16 bg-blue-600 text-white rounded-[1.5rem] shadow-xl hover:scale-105 active:scale-95' : 'right-3 text-slate-400 hover:text-white'
          }`}
        >
          {isLoading ? (
            <Loader2 className={`${isLarge ? 'w-6 h-6' : 'w-4 h-4'} animate-spin`} />
          ) : (
            <Search className={isLarge ? 'w-6 h-6' : 'w-4 h-4'} />
          )}
        </button>
      </div>
    </form>
  );
}
