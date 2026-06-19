/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Copy, Trash2, Heart, Search, Check, AlertCircle, Sparkles } from "lucide-react";

interface FavoriteItem {
  id: string;
  text: string;
  styleName: string;
  savedAt?: string;
}

interface FavoritesListProps {
  favorites: FavoriteItem[];
  onFavoriteToggle: (text: string, styleName: string) => void;
  onClearAll: () => void;
  isDark: boolean;
  triggerToast: (msg: string) => void;
}

export default function FavoritesList({
  favorites,
  onFavoriteToggle,
  onClearAll,
  isDark,
  triggerToast,
}: FavoritesListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFavorites = useMemo(() => {
    if (!searchQuery) return favorites;
    const query = searchQuery.toLowerCase();
    return favorites.filter(
      (item) =>
        item.text.toLowerCase().includes(query) ||
        item.styleName.toLowerCase().includes(query)
    );
  }, [favorites, searchQuery]);

  // Copy helper
  const handleCopy = (str: string, id: string) => {
    try {
      navigator.clipboard.writeText(str);
      setCopiedId(id);
      triggerToast("Copied favorite nickname!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      triggerToast("Copy failed, please select manually.");
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden px-4 pt-4 pb-4">
      {/* Search and delete interaction toolbar */}
      {favorites.length > 0 && (
        <div className="flex flex-col gap-2.5 shrink-0 mb-3">
          <div className="flex items-center justify-between">
            <span className={`text-[9.5px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
              Saved Nicknames ({favorites.length})
            </span>
            <button
              id="clear-all-favorites-btn"
              onClick={onClearAll}
              className={`text-[9.5px] font-black uppercase tracking-[0.15em] hover:opacity-80 transition-opacity flex items-center gap-1 active:scale-95 transition-transform ${
                isDark ? "text-[#CBFB5E]" : "text-red-600"
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          </div>

          <div className="relative">
            <input
              id="favorites-search-bar"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter your saved nicknames..."
              className={`w-full py-2.5 pl-8 pr-3 rounded-lg text-xs font-bold uppercase tracking-wider focus:outline-none transition-all ${
                isDark
                  ? "bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-white/30"
                  : "bg-white border border-slate-200 text-slate-700 placeholder-slate-400 focus:border-slate-300"
              }`}
            />
            <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isDark ? 'text-white/20' : 'text-slate-400'}`} />
          </div>
        </div>
      )}

      {/* Main List Scroller */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2.5 scroll-smooth no-scrollbar">
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl flex flex-col gap-3.5 relative border transition-all duration-200 ${
                  isDark
                    ? "bg-white/5 border-white/10 hover:border-[#CBFB5E]/50 hover:shadow-[0_0_12px_rgba(203,251,94,0.06)]"
                    : "bg-white hover:bg-white hover:border-slate-300"
                }`}
              >
                {/* Nickname String and Actions */}
                <div className="flex items-center justify-between gap-2.5">
                  <span
                    className={`text-lg font-black select-all tracking-wider break-all leading-snug cursor-pointer hover:opacity-85 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                    onClick={() => handleCopy(item.text, item.id)}
                  >
                    {item.text}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Delete button */}
                    <button
                      id={`delete-fav-${item.id}`}
                      onClick={() => onFavoriteToggle(item.text, item.styleName)}
                      className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${
                        isDark
                          ? "bg-white/5 border-white/10 text-white/40 hover:text-red-500 hover:border-red-550/50"
                          : "bg-slate-100 border-slate-200 text-slate-400 hover:text-rose-500"
                      }`}
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Copy action */}
                    <button
                      id={`copy-fav-${item.id}`}
                      onClick={() => handleCopy(item.text, item.id)}
                      className={`p-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center ${
                        isCopied
                          ? "bg-[#CBFB5E] text-black"
                          : isDark
                            ? "bg-white/10 hover:bg-[#CBFB5E] text-white hover:text-black"
                            : "bg-indigo-600 text-white"
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Info and timestamp info */}
                <div className="flex items-center justify-between text-[9px] font-mono font-bold uppercase tracking-widest text-[#CBFB5E]/80">
                  <span>{item.styleName || "Saved Symbol Style"}</span>
                  {item.savedAt && <span className="opacity-60">{item.savedAt}</span>}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 px-6 text-center select-none flex flex-col items-center justify-center gap-4">
            <div className={`p-4 rounded-full border-2 ${isDark ? 'bg-white/5 border-white/10 text-[#CBFB5E]' : 'bg-slate-100 text-slate-400'}`}>
              <Heart className="w-10 h-10 fill-transparent" />
            </div>
            <div>
              <p className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
                {favorites.length === 0 ? "Favorites Empty" : "No match found"}
              </p>
              <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed max-w-[200px] mx-auto">
                {favorites.length === 0
                  ? "Heart your favorite styles inside the Generator or manually create one in the Designer to display here!"
                  : "Refine your filtration keywords to check other items."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
