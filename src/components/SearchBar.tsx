import { Search, Loader2 } from 'lucide-react';
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
          className={`w-full bg-slate-100 border border-transparent focus:border-blue-300 focus:bg-white rounded-[1.5rem] transition-all focus:outline-none font-bold text-slate-800 placeholder:text-slate-400 ${
            isLarge ? 'pl-8 pr-16 py-6 text-2xl rounded-[2.5rem]' : 'pl-4 pr-10 py-2.5 text-sm rounded-full'
          }`}
          placeholder="N° de interno..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`absolute top-1/2 -translate-y-1/2 transition-all flex items-center justify-center ${
            isLarge ? 'right-4 w-12 h-12 bg-blue-600 text-white rounded-2xl shadow-lg' : 'right-3 text-slate-400 hover:text-slate-600'
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