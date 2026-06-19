/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { Search, Copy, Heart, RefreshCw, Sparkles, Filter, X, Check, Eye } from "lucide-react";
import { generateNicknames, SPACERS, StyledNickname } from "../utils/styles";
import { motion, AnimatePresence } from "motion/react";

interface NickGeneratorProps {
  text: string;
  setText: (t: string) => void;
  isDark: boolean;
  favorites: Array<{ id: string; text: string; styleName: string }>;
  onFavoriteToggle: (text: string, styleName: string) => void;
  triggerToast: (msg: string) => void;
}

export default function NickGenerator({
  text,
  setText,
  isDark,
  favorites,
  onFavoriteToggle,
  triggerToast,
}: NickGeneratorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSpacer, setSelectedSpacer] = useState<string>("none");
  const [visibleCount, setVisibleCount] = useState(40);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Set default placeholder recommendation list when text is empty
  const defaultPlaceholder = "Shadow";
  const activeInputText = text || defaultPlaceholder;

  // Track state changes to reset loading limits
  useEffect(() => {
    setVisibleCount(40);
  }, [text, selectedCategory, selectedSpacer, searchQuery]);

  // Generate names dynamically based on input and selected spacing
  const allNicknames = useMemo(() => {
    let baseText = activeInputText;
    
    // Apply spacer if chosen
    if (selectedSpacer !== "none") {
      const spacerObj = SPACERS.find(s => s.id === selectedSpacer);
      if (spacerObj) {
        baseText = baseText.split("").join(spacerObj.char);
      }
    }

    return generateNicknames(baseText);
  }, [activeInputText, selectedSpacer]);

  // Filter nickname list by search input and category tags
  const filteredNicknames = useMemo(() => {
    return allNicknames.filter((item) => {
      // Filter by category
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      
      // Filter by text search
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.styledText.toLowerCase().includes(query) ||
        item.styleName.toLowerCase().includes(query) ||
        item.fontName.toLowerCase().includes(query) ||
        item.decorationName.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [allNicknames, selectedCategory, searchQuery]);

  // Copy helper
  const handleCopy = (str: string, id: string) => {
    try {
      navigator.clipboard.writeText(str);
      setCopiedId(id);
      triggerToast(`Copied stylish nickname!`);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = str;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopiedId(id);
        triggerToast(`Copied stylish nickname!`);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (e) {
        triggerToast("Copy failed, please long press to copy.");
      }
      document.body.removeChild(textArea);
    }
  };

  // Check if item is already in favorites
  const isFavorited = (itemText: string) => {
    return favorites.some(fav => fav.text === itemText);
  };

  // Quick tag tags
  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 40, filteredNicknames.length));
  };

  const clearInput = () => {
    setText("");
  };

  // Popular quick templates to cycle through if user feels uninspired
  const quickPickRef = () => {
    const samples = ["GamerPro", "Viper", "Phoenix", "SniperGod", "Glitch", "Krieger", "Yakuza", "Aether", "Xeno", "Valkyrie", "Chrono"];
    const random = samples[Math.floor(Math.random() * samples.length)];
    setText(random);
    triggerToast(`Loaded: ${random}`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden px-4 pt-4">
      {/* Search Input and Preset Trigger */}
      <div className="flex flex-col gap-3">
        <div className="relative group">
          <label className={`absolute -top-2 left-4 px-1.5 text-[8px] uppercase tracking-widest font-black transition-all ${
            isDark ? "bg-[#0A0A0B] text-[#CBFB5E]" : "bg-white text-indigo-600"
          }`}>
            Enter Base Text
          </label>
          <input
            id="nickname-input-box"
            type="text"
            maxLength={25}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type nickname (e.g. Shadow)"
            className={`w-full py-4 pl-4 pr-24 rounded-xl text-base font-black uppercase tracking-widest focus:outline-none transition-all duration-200 border-2 ${
              isDark
                ? "bg-transparent border-white/20 text-white focus:border-[#CBFB5E]"
                : "bg-transparent border-neutral-800 text-neutral-900 focus:border-indigo-600"
            }`}
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {text && (
              <button
                id="clear-input-button"
                onClick={clearInput}
                className={`p-1 rounded-md hover:bg-white/10 transition-all ${isDark ? 'text-white/40 hover:text-white' : 'text-slate-550'}`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              id="random-suggest-button"
              onClick={quickPickRef}
              className={`p-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all active:scale-95 ${
                isDark 
                  ? "bg-white text-black hover:bg-[#CBFB5E]" 
                  : "bg-black text-white hover:bg-indigo-600"
              }`}
              title="Get Random Name idea"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Spacers / Interval Decorators selector */}
        <div className="flex flex-col gap-1 mt-1">
          <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
            Aesthetic Spacers:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
            {SPACERS.map((spacer) => (
              <button
                key={spacer.id}
                id={`spacer-button-${spacer.id}`}
                onClick={() => setSelectedSpacer(spacer.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all border shrink-0 ${
                  selectedSpacer === spacer.id
                    ? isDark
                      ? "bg-[#CBFB5E] text-black border-[#CBFB5E]"
                      : "bg-black text-white border-black"
                    : isDark
                      ? "bg-white/5 hover:bg-white/10 text-white/70 border-white/10"
                      : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                {spacer.id === "none" ? "None" : spacer.char || "Space"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Styled filter chips list and keyword search */}
      <div className="flex flex-col gap-2 mt-3">
        {/* Category Scroll Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0 select-none">
          {["all", "gaming", "aesthetic", "gothic", "bold", "fancy"].map((cat) => (
            <button
              key={cat}
              id={`cat-chip-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? isDark
                    ? "bg-[#CBFB5E] text-black"
                    : "bg-black text-white"
                  : isDark
                    ? "bg-white/5 hover:bg-white/10 text-white/50"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Searching within names search block */}
        <div className="relative shrink-0 select-none">
          <input
            id="styles-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symbols or styles (e.g. wings, gothic)..."
            className={`w-full py-2 pl-8 pr-3 rounded-lg text-xs font-bold uppercase tracking-wider focus:outline-none transition-all ${
              isDark
                ? "bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-white/30"
                : "bg-white border border-slate-200 text-slate-700 placeholder-slate-400 focus:border-slate-300"
            }`}
          />
          <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isDark ? 'text-white/20' : 'text-slate-400'}`} />
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] mt-4 mb-2 text-white/40">
        <span>{filteredNicknames.length} Styles Loaded</span>
        <span>Tap copy style</span>
      </div>

      {/* Primary scrollable container for Nicknames */}
      <div className="flex-1 overflow-y-auto pr-1 pb-4 flex flex-col gap-2.5 scroll-smooth no-scrollbar">
        {filteredNicknames.length > 0 ? (
          <>
            {filteredNicknames.slice(0, visibleCount).map((item) => {
              const isFav = isFavorited(item.styledText);
              const isCopied = copiedId === item.id;
              
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl flex flex-col gap-3 transition-all duration-200 border ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:border-[#CBFB5E]/50 hover:shadow-[0_0_12px_rgba(203,251,94,0.06)]"
                      : "bg-white hover:bg-white hover:border-slate-300"
                  }`}
                >
                  {/* Title and top-line metadata indicators */}
                  <div className="flex justify-between items-start gap-2">
                    <span className={`text-[9px] font-mono uppercase tracking-[0.15em] ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                      {item.styleName}
                    </span>
                    <button
                      id={`fav-btn-${item.id}`}
                      onClick={() => onFavoriteToggle(item.styledText, item.styleName)}
                      className={`p-1 rounded-md transition-opacity duration-150 ${
                        isFav
                          ? "text-red-500 scale-105"
                          : isDark
                            ? "text-white/30 hover:text-[#CBFB5E]"
                            : "text-slate-400 hover:text-slate-600"
                      }`}
                      title="Add to Favorites"
                    >
                      <Heart className={`w-4.5 h-4.5 ${isFav ? "fill-red-500 stroke-red-500 animate-pulse" : ""}`} />
                    </button>
                  </div>

                  {/* Nickname display */}
                  <div
                    onClick={() => handleCopy(item.styledText, item.id)}
                    className={`text-xl font-black py-1 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity active:scale-[0.99] transition-transform ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {item.styledText}
                  </div>

                  {/* Copy Action footer */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <button
                      id={`copy-btn-${item.id}`}
                      onClick={() => handleCopy(item.styledText, item.id)}
                      className={`flex-1 py-2 rounded-lg font-black text-[9px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 ${
                        isCopied
                          ? isDark 
                            ? "bg-[#CBFB5E] text-black" 
                            : "bg-black text-white"
                          : isDark
                            ? "bg-white/10 text-white hover:bg-[#CBFB5E] hover:text-black"
                            : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Style</span>
                        </>
                      )}
                    </button>
                    
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1.5 rounded-lg select-all ${
                      item.category === "gaming" ? "bg-red-500/10 text-red-500" :
                      item.category === "aesthetic" ? "bg-indigo-500/10 text-indigo-500" :
                      item.category === "gothic" ? "bg-amber-500/10 text-amber-500" :
                      item.category === "bold" ? "bg-sky-500/10 text-sky-500" : "bg-purple-500/10 text-purple-500"
                    }`}>
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Pagination Load more triggers */}
            {filteredNicknames.length > visibleCount && (
              <button
                id="load-more-names-button"
                onClick={showMore}
                className={`w-full py-3.5 mt-2 rounded-xl border-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 select-none hover:scale-[1.01] active:scale-[0.99] shrink-0 cursor-pointer ${
                  isDark
                    ? "bg-white/5 border-white/10 text-white hover:bg-[#CBFB5E] hover:text-black hover:border-[#CBFB5E]"
                    : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-black hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Load More ({filteredNicknames.length - visibleCount} more)
              </button>
            )}
          </>
        ) : (
          <div className="py-12 px-6 text-center select-none flex flex-col items-center justify-center gap-3">
            <Filter className={`w-8 h-8 opacity-40 ${isDark ? 'text-white/20' : 'text-slate-400'}`} />
            <div>
              <p className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white/60' : 'text-slate-600'}`}>No styles found</p>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Try deleting search criteria or type alternative letters.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
