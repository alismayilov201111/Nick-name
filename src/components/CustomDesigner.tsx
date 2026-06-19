/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Copy, Heart, Sparkles, Palette, Trash2, ArrowUpRight, HelpCircle } from "lucide-react";
import { ALPHABET_STYLES, DECORATIONS, SPACERS, applyStyle } from "../utils/styles";

interface CustomDesignerProps {
  isDark: boolean;
  favorites: Array<{ id: string; text: string; styleName: string }>;
  onFavoriteToggle: (text: string, styleName: string) => void;
  triggerToast: (msg: string) => void;
}

export default function CustomDesigner({
  isDark,
  favorites,
  onFavoriteToggle,
  triggerToast,
}: CustomDesignerProps) {
  const [designerText, setDesignerText] = useState("Valkyrie");
  const [selectedFont, setSelectedFont] = useState(ALPHABET_STYLES[0].id);
  const [selectedPrefix, setSelectedPrefix] = useState("꧁༺");
  const [selectedSuffix, setSelectedSuffix] = useState("༻꧂");
  const [selectedSpacer, setSelectedSpacer] = useState("none");

  // Curie individual decoration parts safely for the quick tap selectors
  const popularPrefixes = ["꧁༺", "亗", "〆", "乂", "『", "【", "⚡", "☠️", "✞", "✿", "♛", "⚔️", "★", "❖", "🔥", "👑", "❤", "✦", ""];
  const popularSuffixes = ["༻꧂", "亗", "〆", "乂", "』", "】", "⚡", "☠️", "✞", "✿", "♛", "⚔️", "★", "❖", "🔥", "👑", "❤", "✦", ""];

  // Compute final generated live preview text
  const livePreviewText = useMemo(() => {
    let base = designerText.trim();
    if (!base) return "";

    // Apply spacing if selected
    if (selectedSpacer !== "none") {
      const spacerObj = SPACERS.find((s) => s.id === selectedSpacer);
      if (spacerObj) {
        base = base.split("").join(spacerObj.char);
      }
    }

    // Apply Font map
    const stylized = applyStyle(base, selectedFont);

    // Combine prefix and suffix
    return `${selectedPrefix}${stylized}${selectedSuffix}`;
  }, [designerText, selectedFont, selectedPrefix, selectedSuffix, selectedSpacer]);

  // Copy helper
  const handleCopy = () => {
    if (!livePreviewText) return;
    try {
      navigator.clipboard.writeText(livePreviewText);
      triggerToast("Custom design copied to clipboard!");
    } catch {
      triggerToast("Copy failed, please select and copy manually.");
    }
  };

  // Add/remove favorite
  const isFav = favorites.some((fav) => fav.text === livePreviewText);
  const handleFavoriteClick = () => {
    if (!livePreviewText) return;
    onFavoriteToggle(livePreviewText, "Custom Designed Pro");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden px-4 pt-4 pb-4">
      {/* Dynamic Playground Canvas Wrapper */}
      <div className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg border-2 relative overflow-hidden transition-all shrink-0 ${
        isDark 
          ? "bg-white/5 border-white/10" 
          : "bg-white border-neutral-900"
      }`}>
        {/* Abstract design glows */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#CBFB5E]/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <span className={`text-[8px] font-black uppercase tracking-[0.25em] mb-1 px-2.5 py-0.5 rounded-full ${
          isDark ? 'bg-white/10 text-[#CBFB5E]' : 'bg-neutral-900 text-white'
        }`}>
          Live Custom Canvas
        </span>

        {/* Live Name string screen */}
        <div className="min-h-[70px] w-full flex items-center justify-center px-4 font-black select-all overflow-x-auto my-1 no-scrollbar">
          {livePreviewText ? (
            <p className={`text-xl sm:text-2xl font-black tracking-widest break-all leading-relaxed whitespace-nowrap py-1 ${
              isDark ? "text-[#CBFB5E]" : "text-neutral-900"
            }`}>
              {livePreviewText}
            </p>
          ) : (
            <p className="text-white/30 font-mono text-[10px] uppercase tracking-wider">Configure tags below...</p>
          )}
        </div>

        {/* Action Panel for copying / favoring the live preview */}
        <div className="flex items-center gap-2 mt-2.5 w-full max-w-[280px]">
          <button
            id="designer-fav-btn"
            disabled={!livePreviewText}
            onClick={handleFavoriteClick}
            className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all select-none border-2 ${
              !livePreviewText ? 'opacity-40 cursor-not-allowed' : ''
            } ${
              isFav
                ? isDark 
                  ? "bg-[#CBFB5E]/10 text-[#CBFB5E] border-[#CBFB5E]/50" 
                  : "bg-black text-white border-black"
                : isDark
                  ? "bg-transparent hover:bg-white/15 text-white/70 border-white/15"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-red-500 stroke-red-500" : ""}`} />
            {isFav ? "Saved" : "Save"}
          </button>

          <button
            id="designer-copy-btn"
            disabled={!livePreviewText}
            onClick={handleCopy}
            className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md select-none border-2 ${
              !livePreviewText
                ? "opacity-40 cursor-not-allowed text-stone-500 bg-stone-900/40 border-transparent"
                : isDark
                  ? "bg-white text-black border-white hover:bg-[#CBFB5E] hover:border-[#CBFB5E]"
                  : "bg-neutral-950 text-white border-neutral-950"
            }`}
          >
            <Copy className="w-3.5 h-3.5" />
            Copy Name
          </button>
        </div>
      </div>

      {/* Editor Controls Scroll Container */}
      <div className="flex-1 overflow-y-auto mt-4 pr-1 flex flex-col gap-4 no-scrollbar">
        {/* 1. Base Text input */}
        <div className="flex flex-col gap-1.5">
          <span className={`text-[9.5px] font-black uppercase tracking-[0.15em] ${isDark ? "text-white/40" : "text-slate-500"}`}>
            Base Nickname Text:
          </span>
          <input
            id="designer-raw-input"
            type="text"
            maxLength={18}
            value={designerText}
            onChange={(e) => setDesignerText(e.target.value)}
            placeholder="Type word to modify..."
            className={`w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none transition-all duration-200 border-2 ${
              isDark
                ? "bg-transparent border-white/20 text-white focus:border-[#CBFB5E]"
                : "bg-white border-neutral-900 text-neutral-900 focus:border-indigo-600"
            }`}
          />
        </div>

        {/* 2. Prefix selectors */}
        <div className="flex flex-col gap-2">
          <span className={`text-[9.5px] font-black uppercase tracking-[0.15em] ${isDark ? "text-white/40" : "text-slate-400"}`}>
            Prefix Aesthetic Wings:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {popularPrefixes.map((p, idx) => (
              <button
                key={idx}
                id={`designer-pref-btn-${idx}`}
                onClick={() => setSelectedPrefix(p)}
                className={`py-2 px-3.5 rounded-lg text-xs font-black transition-all select-none border-2 shrink-0 ${
                  selectedPrefix === p
                    ? isDark 
                      ? "bg-[#CBFB5E] text-black border-[#CBFB5E]" 
                      : "bg-black text-white border-black"
                    : isDark
                      ? "bg-white/5 hover:bg-white/10 text-white/70 border-white/10"
                      : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                {p === "" ? "None 空" : p}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Letter style selector */}
        <div className="flex flex-col gap-2">
          <span className={`text-[9.5px] font-black uppercase tracking-[0.15em] ${isDark ? "text-white/40" : "text-slate-400"}`}>
            Active Font Styles:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {ALPHABET_STYLES.map((style) => {
              // Create small preview
              const stylePreview = applyStyle("Style", style.id);
              const isSelected = selectedFont === style.id;
              return (
                <button
                  key={style.id}
                  id={`designer-font-btn-${style.id}`}
                  onClick={() => setSelectedFont(style.id)}
                  className={`p-3 rounded-xl text-left transition-all border-2 flex flex-col gap-0.5 ${
                    isSelected
                      ? isDark 
                        ? "bg-[#CBFB5E]/10 border-[#CBFB5E] text-[#CBFB5E]" 
                        : "bg-neutral-100 border-black text-black font-black"
                      : isDark
                        ? "bg-white/5 hover:bg-white/10 text-white/70 border-white/10"
                        : "bg-white hover:bg-slate-50 text-slate-705 border-slate-200"
                  }`}
                >
                  <span className={`text-[8.5px] font-mono uppercase tracking-widest ${isSelected && isDark ? 'text-[#CBFB5E]/70' : 'text-white/30'}`}>
                    {style.name.split(" (")[0]}
                  </span>
                  <span className="text-xs font-black truncate tracking-wide mt-0.5">
                    {stylePreview}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Suffix selectors */}
        <div className="flex flex-col gap-2">
          <span className={`text-[9.5px] font-black uppercase tracking-[0.15em] ${isDark ? "text-white/40" : "text-slate-400"}`}>
            Suffix Aesthetic Wings:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {popularSuffixes.map((s, idx) => (
              <button
                key={idx}
                id={`designer-suff-btn-${idx}`}
                onClick={() => setSelectedSuffix(s)}
                className={`py-2 px-3.5 rounded-lg text-xs font-black transition-all select-none border-2 shrink-0 ${
                  selectedSuffix === s
                    ? isDark 
                      ? "bg-[#CBFB5E] text-black border-[#CBFB5E]" 
                      : "bg-black text-white border-black"
                    : isDark
                      ? "bg-white/5 hover:bg-white/10 text-white/70 border-white/10"
                      : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                {s === "" ? "None 空" : s}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Custom Spacer picker */}
        <div className="flex flex-col gap-2 pb-2">
          <span className={`text-[9.5px] font-black uppercase tracking-[0.15em] ${isDark ? "text-white/40" : "text-slate-400"}`}>
            Character-Between Divider:
          </span>
          <div className="grid grid-cols-4 gap-1.5">
            {SPACERS.map((s) => (
              <button
                key={s.id}
                id={`designer-spacer-${s.id}`}
                onClick={() => setSelectedSpacer(s.id)}
                className={`py-2.5 rounded-lg text-[10px] font-black uppercase transition-all border shrink-0 ${
                  selectedSpacer === s.id
                    ? isDark 
                      ? "bg-[#CBFB5E] text-black border-[#CBFB5E]" 
                      : "bg-black text-white border-black"
                    : isDark
                      ? "bg-white/5 hover:bg-white/10 text-white/50 border-white/10"
                      : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                {s.id === "none" ? "None" : s.char || "Space"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
