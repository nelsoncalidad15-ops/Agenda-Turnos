import { FormEvent, useState } from 'react';
import { Loader2, Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (interno: string) => void;
  isLoading: boolean;
  isLarge?: boolean;
}

export function SearchBar({ onSearch, isLoading, isLarge }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = query.trim();
    if (value) onSearch(value);
  };

  const clear = () => setQuery('');

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`group relative flex items-center rounded-[1.6rem] border border-slate-200 bg-white/85 shadow-[0_18px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl transition focus-within:border-blue-300 focus-within:shadow-[0_22px_70px_-28px_rgba(59,130,246,0.3)] ${
          isLarge ? 'px-4 py-3' : 'px-3 py-2'
        }`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-[1.05rem] bg-slate-950 text-white shadow-lg shadow-slate-950/15">
          <Search className="h-5 w-5" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
          placeholder="Nro de interno"
          className={`min-w-0 flex-1 border-0 bg-transparent text-slate-950 outline-none placeholder:text-slate-400 ${
            isLarge ? 'px-4 py-3 text-xl font-semibold md:text-2xl' : 'px-3 py-2 text-sm font-semibold'
          }`}
        />

        {query.length > 0 && !isLoading && (
          <button
            type="button"
            onClick={clear}
            className="mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Limpiar busqueda"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={`inline-flex items-center justify-center rounded-[1.1rem] bg-slate-950 font-black text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 ${
            isLarge ? 'h-12 min-w-28 px-6 text-[10px] uppercase tracking-[0.34em]' : 'h-10 min-w-24 px-4 text-[9px] uppercase tracking-[0.3em]'
          }`}
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Buscar'}
        </button>
      </div>
    </form>
  );
}
